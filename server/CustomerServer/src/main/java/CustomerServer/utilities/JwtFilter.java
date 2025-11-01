package CustomerServer.utilities;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String header = request.getHeader("Authorization");

    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      try {
        String email = JwtUtilities.getEmail(token);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null,
            Collections.emptyList());
        auth.setDetails(Map.of(
            "id", JwtUtilities.getUserId(token),
            "email", email));

        SecurityContextHolder.getContext().setAuthentication(auth);
      } catch (Exception ex) {
        // Token invalid → clear context
        SecurityContextHolder.clearContext();
      }
    }

    filterChain.doFilter(request, response);
  }
}
