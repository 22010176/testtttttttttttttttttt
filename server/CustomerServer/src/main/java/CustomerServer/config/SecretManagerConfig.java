package CustomerServer.config;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClientBuilder;

@Configuration
public class SecretManagerConfig {
  @Bean
  public SecretsManagerClient secretsManagerClient() {
    SecretsManagerClientBuilder builder = SecretsManagerClient.builder()
        .region(Region.US_EAST_1)
        .credentialsProvider(
            StaticCredentialsProvider.create(
                AwsBasicCredentials.create("test", "test")));

    String endpoint = System.getenv("LOCALSTACK_ENDPOINT");
    if (endpoint != null && !endpoint.isEmpty())
      builder.endpointOverride(URI.create(endpoint));

    return builder.build();
  }
}
