package CustomerServer.controller;

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
  public String ThemGioHang(@RequestBody String entity) {
    // TODO: process POST request

    return entity;
  }

  @PutMapping("sua-gio-hang/{id}")
  public String SuaGioHang(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }

  @DeleteMapping("/xoa-gio-hang/{id}")
  public String XoaGioHang(@PathVariable String id) {
    return new String();
  }
}
