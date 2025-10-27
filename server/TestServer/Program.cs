using System.Text;
using DatabaseModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TestServer.Utilities;
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

var app = builder.Build();

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


// Console.WriteLine(RandomGenerator.RandomUtcDate(new(1990, 1, 1), new(2030, 1, 1)));
app.Run();
