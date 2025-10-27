using System.Text;
using DatabaseModels;
using DatabaseModels.Models;
using DatabaseModels.Temp_Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using Utilities;

var builder = ServerTemplate.CreateTemplateServer(args);
builder.Services.AddSingleton<S3Service>(options =>
{
  var config = options.GetRequiredService<IConfiguration>();
  var awsConfig = config.GetSection("AWS").Get<S3ServiceParam>();
  return new(awsConfig);
});

ServerTemplate.AddPostgres<AppDbContext>(builder, builder.Configuration.GetConnectionString("PostgresConnection")!);

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
  var jwtSettings = builder.Configuration.GetSection("Jwt");
  var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!.PadRight(32));
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = jwtSettings["Issuer"],
    ValidAudience = jwtSettings["Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(key)
  };
});

builder.Services.AddSingleton<EmailService>(options =>
{
  var config = options.GetRequiredService<IConfiguration>();
  var mailConfig = config.GetSection("MailSettings").Get<EmailSettings>()!;

  return new(mailConfig);
});

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//   var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//   var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
//   var seedDataSection = config.GetSection("SeedDataPath");

//   foreach (var item in seedDataSection.GetChildren())
//   {
//     Console.WriteLine($"{item.Key} => {item.Value}");
//     string baseDir = AppContext.BaseDirectory;
//     string srcSeed = Path.GetFullPath(Path.Combine(baseDir, @"..\..\..", item.Value!));
//     // Console.WriteLine();
//     await JsonSeeder.SeedFromJSON<NganhHang>(db, srcSeed);
//   }
// }

if (app.Environment.IsProduction())
{
  var logger = app.Services.GetRequiredService<ILogger<Program>>();
  var config = app.Services.GetRequiredService<IConfiguration>();
  foreach (var configEntry in config.AsEnumerable())
  {
    logger.LogInformation("Config Key: {Key}, Value: {Value}", configEntry.Key, configEntry.Value);
  }
}

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
