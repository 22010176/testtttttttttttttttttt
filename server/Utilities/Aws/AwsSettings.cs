using System.Text.Json;

namespace Utilities.Aws;

public class AwsSettings
{
  public string RegionEndpoint { get; set; } = null!;
  public string AccessKey { get; set; } = null!;
  public string SecretKey { get; set; } = null!;
  public string SecretName { get; set; } = null!;
  public string ServiceURL { get; set; } = null!;
}

public class AwsSecret
{
  public static void TestSecret(AwsSecret secret)
  {
    var json = JsonSerializer.Serialize(secret, options: new()
    {
      IndentSize = 2,
      WriteIndented = true
    });
    Console.WriteLine(json);
  }
  public DatabaseConfig Database { get; set; } = default!;
  public S3Config S3 { get; set; } = default!;
  public VNPAY VNPAY { get; set; } = default!;
  public MailSettings MailSettings { get; set; } = default!;
  public Jwt Jwt { get; set; } = default!;
}

public class DatabaseConfig
{
  public string Username { get; set; } = default!;
  public string Password { get; set; } = default!;
  public string Host { get; set; } = default!;
  public int Port { get; set; }
  public string DatabaseName { get; set; } = default!;
}

public class S3Config
{
  public string BucketName { get; set; } = default!;
  public string Region { get; set; } = default!;
}

public class VNPAY
{
  public string TmnCode { get; set; } = string.Empty;
  public string HashSecret { get; set; } = string.Empty;
  public string Url { get; set; } = string.Empty;
  public string ReturnUrl { get; set; } = string.Empty;
}

public class MailSettings
{
  public string SmtpServer { get; set; } = string.Empty;
  public int Port { get; set; }
  public string SenderName { get; set; } = string.Empty;
  public string SenderEmail { get; set; } = string.Empty;
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}

public class Jwt
{
  public string Key { get; set; } = string.Empty;
  public string Issuer { get; set; } = string.Empty;
  public string Audience { get; set; } = string.Empty;
}