package CustomerServer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/nganhhang")
@AllArgsConstructor
public class NganhHangController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public ResponseEntity<?> XemDanhSachNganhHang(@RequestParam(defaultValue = "-1") int nganhHangId) {
    String sql;
    List<Map<String, Object>> categories;

    if (nganhHangId != -1) {
      sql = """
          SELECT *
          FROM "NganhHang"
          WHERE "NganhHangChaId" = ?
          """;
      categories = jdbcTemplate.queryForList(sql, nganhHangId);
    } else {
      sql = """
          SELECT *
          FROM "NganhHang"
          WHERE "NganhHangChaId" IS NULL
          """;
      categories = jdbcTemplate.queryForList(sql);
    }

    return ResponseEntity.ok(new ResponseFormat<>(categories, "", true));
  }
}
