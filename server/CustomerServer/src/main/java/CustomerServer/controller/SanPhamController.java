package CustomerServer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/sanpham")
@AllArgsConstructor
public class SanPhamController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public ResponseFormat<List<Map<String, Object>>> getMethodName(
      @RequestParam(required = false) Integer pageSize) {
    String sql = """
        SELECT *
        FROM "SanPham"
        WHERE "Id" IN (
            SELECT "Id"
            FROM "SanPham"
            ORDER BY RANDOM()
            LIMIT ?
        );
                """;
    return new ResponseFormat<>(jdbcTemplate.queryForList(sql, pageSize), "", true);

  }
}
