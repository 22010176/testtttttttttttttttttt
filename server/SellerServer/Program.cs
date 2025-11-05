using System.Text;
using DatabaseModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using Utilities;
using Utilities.Aws;

var builder = ServerTemplate.CreateTemplateServer(args);
// builder.Logging.ClearProviders();
// builder.Logging.SetMinimumLevel(LogLevel.None);

var awsSettings = builder.Configuration.GetSection("AWS").Get<AwsSettings>()!;

SecretsManagerService service = new(awsSettings!);
var secret = (await service.GetSecretAsync())!;

S3Config s3Config = secret.S3;
DatabaseConfig dbConfig = secret.Database;
builder.Services.AddSingleton<SecretsManagerService>(options => new(awsSettings));
builder.Services.AddSingleton<S3Service>(options => new(awsSettings, secret!.S3));
ServerTemplate.AddPostgres<AppDbContext>(builder, $"Host={dbConfig!.Host};Port={dbConfig.Port};Database={dbConfig.DatabaseName};Username={dbConfig.Username};Password={dbConfig.Password}");

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
