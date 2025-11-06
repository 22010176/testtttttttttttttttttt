package CustomerServer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/sanpham")
@AllArgsConstructor
public class SanPhamController {
  private final JdbcTemplate jdbcTemplate;
  private static final Logger log = LoggerFactory.getLogger(SanPhamController.class);

  @GetMapping
  // @SecurityRequirement(name = OpenApiConfig.securityScheme)
  public ResponseEntity<?> XemDanhSachSanPham(@RequestParam(defaultValue = "100") Integer pageSize) {
    System.out.println(pageSize);
    String sql = """
        SELECT
          sp."Id",
          sp."TrangThaiSanPham",
          pbsp."Id" PhienBanSanPhamId,
          pbsp."TenSanPham",
          pbsp."MoTaSanPham",
          pbsp."GiaBan",
          pbsp."NgayTao"::DATE,
          (
            SELECT m."Url"
            FROM "MediaSanPham" m
            WHERE
              m."SanPhamId" = sp."Id"
              AND m."LoaiHinhAnhSanPham" = 0
          ORDER BY m."NgayTao" DESC
          LIMIT 1
          ) anhBia
        FROM "SanPham" sp
        JOIN LATERAL (
          SELECT *
          FROM "PhienBanSanPham" pbsp
          WHERE
            sp."Id" = pbsp."SanPhamId"
            AND pbsp."NgayTao" < CURRENT_DATE
          ORDER BY pbsp."NgayTao" DESC
          LIMIT 1
        ) pbsp ON TRUE
        WHERE sp."Id" IN (
            SELECT "Id"
            FROM "SanPham"
            ORDER BY RANDOM()
            LIMIT ?
        )
        ORDER BY sp."Id"
        """;
    return ResponseEntity.ok(new ResponseFormat<>(jdbcTemplate.queryForList(sql, pageSize), "", true));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getProductDetail(@PathVariable String id) {
    String sql = """
        SELECT
          sp."Id",
          pbsp."Id" PhienBanSanPhamId,
          pbsp."TenSanPham",
          pbsp."MoTaSanPham",
          pbsp."GiaBan",
          pbsp."NgayTao"::DATE,
          tknb."HoTen"
        FROM "SanPham" sp
        JOIN LATERAL (
          SELECT *
          FROM "PhienBanSanPham" pbsp
          WHERE
            sp."Id" = pbsp."SanPhamId"
            AND pbsp."NgayTao" < CURRENT_DATE
          ORDER BY pbsp."NgayTao"
          LIMIT 1
        ) pbsp ON TRUE
        INNER JOIN "TaiKhoanNguoiBan" tknb ON tknb."Id" = sp."NguoiBanId"
        WHERE sp."Id" = ?
        """;
    String mediaSql = """
        SELECT
          m_sp."Url",
          m_sp."LoaiHinhAnhSanPham"
        FROM "SanPham" sp
        INNER JOIN "MediaSanPham" m_sp ON m_sp."SanPhamId" = sp."Id"
        WHERE sp."Id" = ?
        ORDER BY m_sp."LoaiHinhAnhSanPham", m_sp."NgayTao" DESC
        LIMIT 8
        """;
    Map<String, Object> product = jdbcTemplate.queryForMap(sql, id);
    List<Map<String, Object>> media = jdbcTemplate.queryForList(mediaSql, id);

    Map<String, Object> result = new HashMap<>();
    result.put("media", media);
    result.put("sanpham", product);
    return ResponseEntity.ok(new ResponseFormat<>(result, "", true));
  }

  @GetMapping("/tim-kiem")
  public ResponseFormat<List<Map<String, Object>>> searchProducts(@RequestParam String param) {
    String sql = """
        SELECT *
        FROM "PhienBanSanPham" AS pbs
        JOIN "SanPham" AS sp ON pbs."SanPhamId" = sp."Id"
        WHERE pbs."TenSanPham" LIKE ?
        LIMIT 100
        """;
    List<Map<String, Object>> products = jdbcTemplate.queryForList(sql, "%" + param + "%");
    return new ResponseFormat<>(products, "", true);
  }

}
