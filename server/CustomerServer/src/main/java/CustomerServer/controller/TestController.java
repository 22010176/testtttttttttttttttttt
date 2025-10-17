package CustomerServer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class TestController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public ResponseFormat<List<Map<String, Object>>> getMethodName() {
    String sql = """
        SELECT * FROM "SanPham"
        """;
    return ResponseFormat.success(jdbcTemplate.queryForList(sql), sql);
  }

}
