package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class VNPAY {
  String TmnCode;
  String HashSecret;
  String Url;
  String ReturnUrl;
}