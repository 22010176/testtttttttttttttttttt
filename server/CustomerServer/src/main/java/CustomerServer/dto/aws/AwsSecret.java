package CustomerServer.dto.aws;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AwsSecret {
  private DatabaseConfig database;
  private S3Config s3;
  private VNPAY VNPAY;
  private MailSettings MailSettings;
  private Jwt Jwt;
}