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
    _secretName = settings.SecretName;
    var config = new AmazonSecretsManagerConfig()
    {
      ServiceURL = settings.ServiceURL,
      AuthenticationRegion = settings.RegionEndpoint
    };
    var creds = new BasicAWSCredentials(settings.AccessKey, settings.SecretKey);
    _client = new AmazonSecretsManagerClient(creds, config);
  }

  public async Task<AwsSecret?> GetSecretAsync()
  {
    var response = await _client.GetSecretValueAsync(new GetSecretValueRequest
    {
      SecretId = _secretName
    });

    return response.SecretString != null
      ? JsonConvert.DeserializeObject<AwsSecret>(response.SecretString)
      : null;
  }

}