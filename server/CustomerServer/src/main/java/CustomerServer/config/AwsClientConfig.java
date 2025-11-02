package CustomerServer.config;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClientBuilder;

@Configuration
@AllArgsConstructor
@Getter
public class AwsClientConfig {
  private final AwsProperties aws;

  @Bean
  S3Client s3Client() {
    // System.out.println(accessKey + " " + secretKey + " " + region + " " +
    // bucketName + " " + endpoint);
    return S3Client.builder()
        .endpointOverride(URI.create(aws.getEndpoint())) // LocalStack endpoint
        .credentialsProvider(
            StaticCredentialsProvider
                .create(AwsBasicCredentials.create(aws.getAccessKey(), aws.getSecretKey())))
        .region(Region.of(aws.getRegion()))
        .serviceConfiguration(S3Configuration.builder()
            .pathStyleAccessEnabled(true)
            .build())
        .build();
  }

  @Bean
  SecretsManagerClient secretsManagerClient() {
    SecretsManagerClientBuilder builder = SecretsManagerClient.builder()
        .region(Region.of(aws.getRegion()))
        .credentialsProvider(
            StaticCredentialsProvider.create(AwsBasicCredentials.create(aws.getAccessKey(), aws.getSecretKey())));

    if (aws.getEndpoint() != null && !aws.getEndpoint().isEmpty())
      builder.endpointOverride(URI.create(aws.getEndpoint()));

    return builder.build();
  }

}