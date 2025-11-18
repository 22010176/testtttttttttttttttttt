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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import CustomerServer.dto.diachi.ThemDiaChiRequest;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/diachi")
@AllArgsConstructor
public class DiaChiController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public ResponseEntity<?> XemDanhSachDiaChi(String id) {
    // int taiKhoanKhachHangId = JwtUtilities.getUserId();
    // int taiKhoanKhachHangId = 1;
    String sql = """
        SELECT *
        FROM "DiaChiGiaoHang"
        WHERE "TaiKhoanKhachHangId" = ?
        ORDER BY "Id"
        LIMIT 1
        """;
    List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, id);

    return ResponseEntity.ok(new ResponseFormat<>(
        data,
        "",
        true));

  }

  @PostMapping
  public ResponseEntity<?> ThemDiaChi(@RequestBody ThemDiaChiRequest entity) {
    // int taiKhoanKhachHangId = JwtUtilities.getUserId();
    String sql = """
        INSERT INTO "DiaChiGiaoHang"
        ("Id", "TaiKhoanKhachHangId", "HoTen", "SoDienThoai", "DiaChiCuThe")
        VALUES (?, ?, ?, ?, ?)
        """;
    jdbcTemplate.update(sql,
        UUID.randomUUID().toString(),
        entity.getTaiKhoanId(),
        entity.getHoTen(),
        entity.getSoDienThoai(),
        entity.getDiaChiCuThe());

    return ResponseEntity.ok(new ResponseFormat<>(null, "", true));
    // try {
    // } catch (Exception e) {
    // // TODO: handle exception
    // return ResponseEntity
    // .badRequest()
    // .body(ResponseFormat.fail(e));
    // }
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
}
