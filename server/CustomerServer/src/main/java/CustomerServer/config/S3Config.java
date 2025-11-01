
package CustomerServer.config;

import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

@Configuration
@Getter
@Setter
public class S3Config {
  @Value("${aws.access-key}")
  private String accessKey;

  @Value("${aws.secret-key}")
  private String secretKey;

  @Value("${aws.region}")
  private String region;

  @Value("${aws.s3-bucket}")
  private String bucketName;

  @Bean
  S3Client s3Client() {
    System.out.println(accessKey + " " + secretKey + " " + region + " " + bucketName);
    return S3Client.builder()
        .endpointOverride(URI.create("http://localhost:4566")) // LocalStack endpoint
        .credentialsProvider(
            StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
        .region(Region.of(region))
        .serviceConfiguration(S3Configuration.builder()
            .pathStyleAccessEnabled(true)
            .build())
        // .httpClientBuilder(UrlConnectionHttpClient.builder())
        .build();
  }
}
