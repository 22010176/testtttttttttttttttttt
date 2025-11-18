package CustomerServer.dto.aws;

import lombok.Data;

@Data
public class MailSettings {
  String SmtpServer;
  int Port;
  String SenderName;
  String SenderEmail;
  String Username;
  String Password;
}