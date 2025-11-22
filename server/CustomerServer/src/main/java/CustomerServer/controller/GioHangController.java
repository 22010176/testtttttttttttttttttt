package CustomerServer.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import CustomerServer.dto.giohang.ThemGioHangRequest;
import CustomerServer.utilities.ControllerUtils;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/giohang")
@AllArgsConstructor
public class GioHangController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public ResponseEntity<?> XemDanhSachGioHang(String khachHangId) {
    ControllerUtils.CheckAccount(jdbcTemplate, khachHangId);

    String sql = """
        SELECT
        	ghkh."Id",
        	ghkh."SanPhamId",
        	ghkh."KhachHangId",
        	gh."Id" "GianHangId",
        	sp."TenSanPham",
          sp."PhienBanSanPhamId",
        	sp."GiaBan",
        	gh."TenGianHang",
        	sp."Url" "HinhAnhSanPham"
        FROM "GioHangKhachHang" ghkh
        INNER JOIN "TaiKhoanKhachHang" tkkh ON tkkh."Id" = ghkh."KhachHangId"
        JOIN LATERAL (
        	SELECT
        		sp2."Id",
        		sp2."NguoiBanId",
        		pbsp2."Id" "PhienBanSanPhamId",
        		pbsp2."TenSanPham",
        		pbsp2."GiaBan",
        		media."Url"
        	FROM "SanPham" sp2
        	LEFT JOIN "MediaSanPham" media ON media."SanPhamId" = sp2."Id"
        	INNER JOIN "PhienBanSanPham" pbsp2 ON sp2."Id" = pbsp2."SanPhamId"
        	WHERE
        		ghkh."SanPhamId" = sp2."Id"
        		-- AND pbsp2."NgayTao" < CURRENT_DATE
        		AND (
        			media."LoaiHinhAnhSanPham" = 0
        			OR media."Url" IS NULL
        		)
        	ORDER BY pbsp2."NgayTao" DESC
        	LIMIT 1
        ) sp ON TRUE
        INNER JOIN "TaiKhoanNguoiBan" tknb ON tknb."Id" = sp."NguoiBanId"
        INNER JOIN "GianHang" gh ON gh."NguoiBanId" = tknb."Id"
        WHERE tkkh."Id" = ?
        ORDER BY ghkh."Id"
        """;
    List<Map<String, Object>> orders = jdbcTemplate.queryForList(sql, khachHangId);
    return ResponseEntity.ok(ResponseFormat.success(orders, ""));
  }

  @PostMapping
  public ResponseEntity<?> ThemGioHang(
      // Authentication authentication,
      @RequestBody ThemGioHangRequest entity) {
    // TODO: process POST request
    // entity.setKhachHangId("e6794ee2-2ed6-4f40-9280-1edfb5122db9");
    if (jdbcTemplate.queryForList("""
          SELECT * FROM "TaiKhoanKhachHang"
          WHERE "Id" = ?
        """, entity.getKhachHangId()).isEmpty()) {
      throw new Error("Tai khoan khong ton tai");
    }
    ;
    String checkSql = """
        SELECT
        	ghkh."Id"
        FROM "GioHangKhachHang" ghkh
        WHERE
        	ghkh."KhachHangId" = ?
        	AND ghkh."SanPhamId" = ?
        LIMIT 1;
        """;
    List<Map<String, Object>> data = jdbcTemplate.queryForList(checkSql,
        entity.getKhachHangId(),
        entity.getSanPhamId());

    if (!data.isEmpty()) {
      System.out.println("DDDDDDDD " + data.get(0));
      return ResponseEntity.ok(ResponseFormat.success(null, "da ton tai"));
    }

    String sql = """
        INSERT INTO "GioHangKhachHang"
        ("Id", "SanPhamId", "KhachHangId", "SoLuong")
        VALUES (?, ?, ?, ?);
        """;
    jdbcTemplate.update(sql,
        UUID.randomUUID().toString(),
        entity.getSanPhamId(),
        entity.getKhachHangId(),
        1);
    return ResponseEntity.ok(ResponseFormat.success(null, ""));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> XoaGioHang(
      @PathVariable String id) {
    String sql = """
        DELETE FROM "GioHangKhachHang"
        WHERE "Id" = ?;
        """;
    jdbcTemplate.update(sql, id);
    return ResponseEntity.ok(ResponseFormat.success());
  }
}
