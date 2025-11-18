package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class Jwt {
  String Key;
  String Issuer;
  String Audience;
}