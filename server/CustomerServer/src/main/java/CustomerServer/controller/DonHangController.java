package CustomerServer.controller;

import org.springframework.boot.autoconfigure.batch.BatchProperties.Jdbc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/donhang")
@AllArgsConstructor
public class DonHangController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping("danhsach")
  public String XemDanhSachDonHang(@RequestParam String param) {
    return new String();
  }

  @GetMapping
  public String XemThongTinDonHang(@RequestParam String param) {
    return new String();
  }

  @PostMapping
  public String TaoDonHang(@RequestBody String entity) {
    // TODO: process POST request

    return entity;
  }

  @PutMapping("{id}")
  public String CapNhatThongTinDonHang(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }

  @PutMapping("huydonhang/{id}")
  public String HuyDonHang(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }
}
