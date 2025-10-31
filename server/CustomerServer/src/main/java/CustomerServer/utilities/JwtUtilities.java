package CustomerServer.utilities;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtilities {
  private static final String SECRET = "your-256-bit-secret-your-256-bit-secret"; // move to env variable!
  private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
  private static final long EXPIRATION = 1000 * 60 * 60 * 24 * 1000; // in milliseconds (1000 days)

  public static String generateToken(String email) {
    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
        .signWith(key)
        .compact();
  }

  public static String validateTokenAndGetEmail(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }
}
