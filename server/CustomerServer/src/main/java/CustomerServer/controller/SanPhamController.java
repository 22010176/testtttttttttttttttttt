package CustomerServer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.config.OpenApiConfig;
import CustomerServer.dto.ResponseFormat;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/sanpham")
@AllArgsConstructor
public class SanPhamController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping("nganhhang")
  public ResponseFormat<Object> XemDanhSachNganhHang(
      @RequestParam(defaultValue = "-1") int nganhHangId) {
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

    return new ResponseFormat<>(categories, "", true);
  }

  @GetMapping
  @SecurityRequirement(name = OpenApiConfig.securityScheme)
  public ResponseFormat<List<Map<String, Object>>> XemDanhSachSanPham(
      Authentication authentication,
      @RequestParam(required = false) Integer pageSize) {
    try {
      String email = authentication.getName();

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
                m."PhienBanSanPhamId" = pbsp."Id"
                AND m."LoaiHinhAnhSanPham" = 1
            ) anhBia
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
          WHERE sp."Id" IN (
              SELECT "Id"
              FROM "SanPham"
              ORDER BY RANDOM()
              LIMIT ?
          )
          ORDER BY sp."Id"
          """;
      return new ResponseFormat<>(jdbcTemplate.queryForList(sql, pageSize), "", true);

    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseFormat<>(null, e.getMessage(), false);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseFormat<Object>> getProductDetail(@PathVariable Integer id) {
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
        JOIN LATERAL (
          SELECT *
          FROM "PhienBanSanPham" pbsp
          WHERE
            sp."Id" = pbsp."SanPhamId"
            AND pbsp."NgayTao" < CURRENT_DATE
          ORDER BY pbsp."NgayTao"
          LIMIT 1
        ) pbsp ON TRUE
        INNER JOIN "MediaSanPham" m_sp ON m_sp."PhienBanSanPhamId" = pbsp."Id"
        WHERE sp."Id" = ?
        ORDER BY m_sp."LoaiHinhAnhSanPham" DESC, m_sp."NgayTao" DESC
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
  public ResponseFormat<List<Map<String, Object>>> searchProducts(
      @RequestParam String param) {
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
