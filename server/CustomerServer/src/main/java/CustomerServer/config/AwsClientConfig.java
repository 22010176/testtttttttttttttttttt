package CustomerServer.config;

import java.net.URI;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import CustomerServer.dto.aws.AwsSecret;
import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClientBuilder;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Configuration
@AllArgsConstructor
@Getter
public class AwsClientConfig {
  private final AwsProperties aws;

  StaticCredentialsProvider staticCredentialsProvider() {
    return StaticCredentialsProvider
        .create(AwsBasicCredentials.create(aws.getAccessKey(), aws.getSecretKey()));
  }

  @Bean
  S3Client s3Client() {
    return S3Client
        .builder()
        .endpointOverride(URI.create(aws.getEndpoint())) // LocalStack endpoint
        .credentialsProvider(staticCredentialsProvider())
        .region(Region.of(aws.getRegion()))
        .serviceConfiguration(S3Configuration.builder()
            .pathStyleAccessEnabled(true)
            .build())
        .build();
  }

  @Bean
  DataSource dataSource() {
    AwsSecret secret = awsSecret();

    DriverManagerDataSource ds = new DriverManagerDataSource();
    ds.setDriverClassName("org.postgresql.Driver");
    ds.setUrl(String.format("jdbc:postgresql://%s:%d/%s", secret.getHost(), secret.getPort(), secret.getDbname()));
    ds.setUsername(secret.getUsername());
    ds.setPassword(secret.getPassword());
    return ds;
  }

  @Bean
  SecretsManagerClient secretsManagerClient() {
    SecretsManagerClientBuilder builder = SecretsManagerClient
        .builder()
        .region(Region.of(aws.getRegion()))
        .credentialsProvider(staticCredentialsProvider());

    String endpoint = aws.getEndpoint();
    if (endpoint != null && !endpoint.isEmpty())
      builder.endpointOverride(URI.create(endpoint));

    return builder.build();
  }

  @Bean
  AwsSecret awsSecret() {
    SecretsManagerClient client = secretsManagerClient();
    GetSecretValueResponse response = client.getSecretValue(GetSecretValueRequest.builder()
        .secretId(aws.getSecretName())
        .build());
    String secretString = response.secretString();
    System.out.println(secretString);
    ObjectMapper objectMapper = new ObjectMapper();

    // AwsSecret secret;
    try {
      return objectMapper.readValue(secretString, AwsSecret.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("Failed to parse secret JSON: " + e.getMessage(), e);
    }
  }

}