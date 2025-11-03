package CustomerServer.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import CustomerServer.dto.giohang.ThemGioHangRequest;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/giohang")
@AllArgsConstructor
public class GioHangController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public String XemDanhSachGioHang(@RequestParam String param) {
    return new String();
  }

  @PostMapping("/them-gio-hang")
  public ResponseEntity<?> ThemGioHang(
      Authentication authentication,
      @RequestBody ThemGioHangRequest entity) {
    // TODO: process POST request

    String sql = """
        INSERT INTO "GioHangKhachHang"
        ("Id", "SanPhamId", "KhachHangId", "SoLuong")
        VALUES (?, ?, ?, ?);
        """;
    jdbcTemplate.update(sql,
        UUID.randomUUID().toString(),
        entity.getSanPhamId(),
        entity.getKhachHangId(),
        entity.getSoLuong());
    return ResponseEntity.ok(ResponseFormat.success(null, ""));
  }

  @PutMapping("sua-gio-hang/{id}")
  public ThemGioHangRequest SuaGioHang(
      @PathVariable String id,
      @RequestBody ThemGioHangRequest entity) {
    // TODO: process PUT request

    return entity;
  }

  @DeleteMapping("/xoa-gio-hang/{id}")
  public String XoaGioHang(@PathVariable String id) {
    return new String();
  }
}
