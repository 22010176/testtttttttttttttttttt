package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class AwsSecret {
  private String username;
  private String password;
  private String host;
  private int port;
  private String dbname;
  private String bucketName;
}