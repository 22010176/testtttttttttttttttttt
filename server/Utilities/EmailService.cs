using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Utilities;

public class EmailService(EmailSettings settings)
{
  private readonly EmailSettings _settings = settings;

  public async Task SendEmailAsync(string toEmail, string subject, string body)
  {
    var email = new MimeMessage();
    email.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
    email.To.Add(MailboxAddress.Parse(toEmail));
    email.Subject = subject;
    email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

    using var smtp = new SmtpClient();
    await smtp.ConnectAsync(_settings.SmtpServer, _settings.Port, SecureSocketOptions.StartTls);
    await smtp.AuthenticateAsync(_settings.Username, _settings.Password);
    await smtp.SendAsync(email);
    await smtp.DisconnectAsync(true);
  }
}

public class EmailSettings
{
  public string SmtpServer { get; set; } = string.Empty;
  public int Port { get; set; }
  public string SenderName { get; set; } = string.Empty;
  public string SenderEmail { get; set; } = string.Empty;
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}