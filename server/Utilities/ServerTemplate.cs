using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace Utilities;

public static class ServerTemplate
{
  public static WebApplicationBuilder CreateTemplateServer(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddLogging(logging => logging.AddConsole());
    builder.Configuration
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
        .AddEnvironmentVariables();
    builder.Services.AddCors(options =>
    {
      options.AddDefaultPolicy(policy =>
        {
          policy.SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
    });
    builder.Services.AddControllers().AddNewtonsoftJson(options =>
    {
      options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });
    builder.Services.AddSwaggerGen(options =>
    {
      options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
      {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer {token}'"
      });
      options.AddSecurityRequirement(new OpenApiSecurityRequirement
      {
        {
          new ()
          {
            Reference = new () { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
          },
          Array.Empty<string>()
        }
      });
    });
    return builder;
  }

}
