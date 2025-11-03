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
  public DatabaseConfig Database { get; set; } = default!;
  public S3Config S3 { get; set; } = default!;
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