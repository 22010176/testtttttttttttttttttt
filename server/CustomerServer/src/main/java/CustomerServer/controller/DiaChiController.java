package CustomerServer.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/diachi")
@AllArgsConstructor
public class DiaChiController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping
  public String XemDanhSachDiaChi() {
    return new String();
  }

  @PutMapping("{id}")
  public String SuaDiaChi(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }

  @PostMapping
  public String ThemDiaChi(@RequestBody String entity) {
    // TODO: process POST request

    return entity;
  }

  @DeleteMapping("{id}")
  public String XoaDiaChi(@PathVariable String id) {
    return new String();
  }
}
