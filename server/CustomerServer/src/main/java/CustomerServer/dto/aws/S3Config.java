package CustomerServer.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class S3Config {
  public String BucketName;
  public String Region;
}