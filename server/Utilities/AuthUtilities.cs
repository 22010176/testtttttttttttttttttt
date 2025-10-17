using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Utilities;

public static class AuthUtilities
{
  public static (string Hash, string Salt) GeneratePasswordHash(string password)
  {
    byte[] saltBytes = RandomNumberGenerator.GetBytes(16);
    using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 999_999, HashAlgorithmName.SHA512);
    byte[] hashBytes = pbkdf2.GetBytes(32);
    return (Convert.ToBase64String(hashBytes), Convert.ToBase64String(saltBytes));
  }

  public static bool VerifyPassword(string password, string storedHash, string storedSalt)
  {
    byte[] saltBytes = Convert.FromBase64String(storedSalt);
    using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 999_999, HashAlgorithmName.SHA512);
    byte[] hashBytes = pbkdf2.GetBytes(32);

    string computedHash = Convert.ToBase64String(hashBytes);
    return computedHash == storedHash;
  }
  public static string GenerateAuthToken(string issuer, string audience, Claim[] claims, string jwt_key, DateTime expires)
  {
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt_key!.PadRight(32)));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var token = new JwtSecurityToken(
      issuer: issuer,
      audience: audience,
      claims: claims,
      expires: expires,
      signingCredentials: creds
    );
    return new JwtSecurityTokenHandler().WriteToken(token);
  }
}

public class ResponseFormat
{
  public object? Data { get; set; }
  public string? Message { get; set; }
  public bool Success { get; set; } = false;
}