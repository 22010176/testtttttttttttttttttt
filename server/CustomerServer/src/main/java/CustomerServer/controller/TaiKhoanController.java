package CustomerServer.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/taikhoan")
@AllArgsConstructor
public class TaiKhoanController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public String XemThongTinTaiKhoan() {
    return new String();
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
