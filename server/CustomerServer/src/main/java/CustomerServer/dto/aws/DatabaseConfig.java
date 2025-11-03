package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class DatabaseConfig {
  private String username;
  private String password;
  private String host;
  private int port;
  private String databaseName;
}