package CustomerServer.services;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Service
@AllArgsConstructor
public class SecretService {
  private final SecretsManagerClient secretsClient;

  public String getSecret(String secretName) {
    GetSecretValueRequest request = GetSecretValueRequest.builder()
        .secretId(secretName)
        .build();

    GetSecretValueResponse response = secretsClient.getSecretValue(request);
    return response.secretString();
  }
}
