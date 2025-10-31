package CustomerServer.controller;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.config.OpenApiConfig;
import CustomerServer.dto.DangKiTaiKhoanRequest;
import CustomerServer.dto.DangNhapTaiKhoanRequest;
import CustomerServer.dto.ResponseFormat;
import CustomerServer.utilities.JwtUtilities;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/taikhoan")

@AllArgsConstructor
public class TaiKhoanController {
  private final JdbcTemplate jdbcTemplate;

  @PostMapping("dang-ki")
  public ResponseFormat<Object> DangKiTaiKhoan(@RequestBody DangKiTaiKhoanRequest entity) {
    try {
      String checkSQL = """
              SELECT COUNT(*) FROM "TaiKhoanKhachHang"
              WHERE "Email" = ? OR "SoDienThoai" = ?
          """;
      Integer count = jdbcTemplate.queryForObject(checkSQL, Integer.class, entity.getEmail(),
          entity.getSoDienThoai());
      if (count != null && count > 0)
        throw new Exception("Email hoặc số điện thoại đã tồn tại");

      String sql = """
          INSERT INTO "TaiKhoanKhachHang"
          ("HoTen", "Email", "SoDienThoai", "MatKhauBam", "Salt", "SinhNhat", "NgayTao")
          VALUES (?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE);
          """;

      String salt = BCrypt.gensalt();
      String hashedPassword = BCrypt.hashpw(entity.getMatKhau(), salt);

      jdbcTemplate.update(sql, entity.getHoTen(), entity.getEmail(), entity.getSoDienThoai(),
          hashedPassword, salt);

      return new ResponseFormat<>(null, "Đăng kí tài khoản thành công", true);
    } catch (Exception e) {
      return new ResponseFormat<>(null, e.getMessage(), false);
    }
  }

  @PostMapping("dang-nhap")
  public ResponseFormat<Object> DangNhapTaiKhoan(@RequestBody DangNhapTaiKhoanRequest entity) {
    // TODO: process POST request
    try {
      String sql = """
          SELECT "Id", "MatKhauBam", "Salt"
          FROM "TaiKhoanKhachHang"
          WHERE "Email" = ?
          LIMIT 1
          """;
      var taiKhoan = jdbcTemplate.queryForMap(sql, entity.getEmail());
      if (!BCrypt.checkpw(entity.getMatKhau(), taiKhoan.get("MatKhauBam").toString())) {
        throw new Exception("Mật khẩu không đúng");
      }

      String token = JwtUtilities.generateToken(entity.getEmail());

      return new ResponseFormat<>(Map.of("token", token), "Đăng nhập thành công", true);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return new ResponseFormat<>(null, e.getMessage(), false);
    }
  }

  @GetMapping
  @SecurityRequirement(name = OpenApiConfig.securityScheme)
  public ResponseFormat<Object> XemThongTinTaiKhoan(Authentication authentication) {
    try {
      String email = authentication.getName();
      String sql = """
          SELECT "HoTen", "Email", "SoDienThoai", "SinhNhat"
          FROM "TaiKhoanKhachHang"
          WHERE "Email" = ?
          LIMIT 1
          """;
      var taiKhoan = jdbcTemplate.queryForMap(sql, email);
      return new ResponseFormat<>(taiKhoan, "Xem thông tin tài khoản thành công", true);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseFormat<>(null, e.getMessage(), false);
    }
  }

  @PutMapping
  public String SuaThongTinTaiKhoan(@RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }

  @PutMapping("doimatkhau/{id}")
  public String DoiMatKhau(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }
}
