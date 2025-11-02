package CustomerServer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties
@Data
public class AwsProperties {
  @Value("${aws.access-key}")
  private String accessKey;

  @Value("${aws.secret-key}")
  private String secretKey;

  @Value("${aws.region}")
  private String region;

  @Value("${aws.secret-name}")
  private String secretName;

  @Value("${aws.endpoint}")
  private String endpoint;
}
