package CustomerServer.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DatabaseConfig {
  private String username;
  private String password;
  private String host;
  private int port;
  private String databaseName;
}