package CustomerServer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
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
import CustomerServer.dto.diachi.ThemDiaChiRequest;
import CustomerServer.services.S3Service;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/diachi")
@AllArgsConstructor
public class DiaChiController {
  private final JdbcTemplate jdbcTemplate;
  private final S3Service s3Service;

  @GetMapping
  public ResponseEntity<?> XemDanhSachDiaChi() {
    try {
      // int taiKhoanKhachHangId = JwtUtilities.getUserId();
      int taiKhoanKhachHangId = 1;
      String sql = """
          SELECT *
          FROM "DiaChiGiaoHang"
          WHERE "TaiKhoanKhachHangId" = ?
          """;
      List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, taiKhoanKhachHangId);

      return ResponseEntity.ok(new ResponseFormat<>(
          data,
          "",
          true));
    } catch (Exception e) {
      // TODO: handle exception
      return ResponseEntity
          .badRequest()
          .body(new ResponseFormat<>());
    }
  }

  @PostMapping
  public ResponseEntity<?> ThemDiaChi(@RequestBody ThemDiaChiRequest entity) {
    try {
      // int taiKhoanKhachHangId = JwtUtilities.getUserId();
      int taiKhoanKhachHangId = 1;
      String sql = """
          INSERT INTO "DiaChiGiaoHang"
          ("TaiKhoanKhachHangId", "HoTen", "SoDienThoai", "DiaChiCuThe")
          VALUES (?, ?, ?, ?)
          """;
      jdbcTemplate.update(sql,
          taiKhoanKhachHangId,
          entity.getHoTen(),
          entity.getSoDienThoai(),
          entity.getDiaChiCuThe());

      return ResponseEntity.ok(new ResponseFormat<>(null, "", true));
    } catch (Exception e) {
      // TODO: handle exception
      return ResponseEntity
          .badRequest()
          .body(new ResponseFormat<>());
    }
  }

  @PutMapping("{id}")
  public String SuaDiaChi(@PathVariable String id, @RequestBody String entity) {
    return entity;
  }

  @DeleteMapping("{id}")
  public String XoaDiaChi(@PathVariable String id) {
    String sql = """
        DELETE FROM public."DiaChiGiaoHang"
        WHERE Id = ?;
        """;
    jdbcTemplate.update(sql, id);
    return new String();
  }

  @PostMapping("/upload")
  public String upload(@RequestParam String key, @RequestParam String content) {
    s3Service.uploadFile(key, content);
    return "File uploaded: " + key;
  }

  @GetMapping("/read")
  public String read(@RequestParam String key) {
    return s3Service.readFile(key);
  }
}
