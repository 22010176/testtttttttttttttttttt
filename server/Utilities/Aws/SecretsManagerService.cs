using Amazon.Runtime;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Newtonsoft.Json;

namespace Utilities.Aws;

public class SecretsManagerService
{
  private readonly AmazonSecretsManagerClient _client;
  private readonly string _secretName;

  public SecretsManagerService(AwsSettings settings)
  {
    // _secretName = settings.SecretName;
    // var config = new AmazonSecretsManagerConfig()
    // {
    //   ServiceURL = settings.ServiceURL,
    //   AuthenticationRegion = settings.RegionEndpoint
    // };
    // var creds = new BasicAWSCredentials(settings.AccessKey, settings.SecretKey);
    // _client = new AmazonSecretsManagerClient(creds, config);
  }

  public async Task<AwsSecret?> GetSecretAsync()
  {
    return new()
    {
      Database = new()
      {
        Username = "postgres",
        DatabaseName = "TMDT",
        Host = "localhost",
        Password = "admin",
        Port = 5432
      },
      Jwt = new()
      {
        Audience = "yourapp_users",
        Issuer = "yourapp",
        Key = "your_super_secret_key_123456"
      },
      MailSettings = new() { },
      S3 = new() { },
      VNPAY = new() { }
    };
    // var response = await _client.GetSecretValueAsync(new GetSecretValueRequest
    // {
    //   SecretId = _secretName
    // });

    // return response.SecretString != null
    //   ? JsonConvert.DeserializeObject<AwsSecret>(response.SecretString)
    //   : null;
  }

}