package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class S3Config {
  public String BucketName;
  public String Region;
}