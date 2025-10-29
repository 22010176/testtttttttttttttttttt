package CustomerServer.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/thanhtoan")
@AllArgsConstructor
public class ThanhToanController {
  private final JdbcTemplate jdbcTemplate;

}
