package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class AwsSecret {
  private DatabaseConfig database;
  private S3Config s3;
}