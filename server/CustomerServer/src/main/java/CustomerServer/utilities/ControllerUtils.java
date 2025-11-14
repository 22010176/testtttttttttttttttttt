package CustomerServer.utilities;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

public class ControllerUtils {
  public static void CheckAccount(JdbcTemplate jdbcTemplate, String id) {
    String sqlCheckAccount = """
        SELECT * FROM "TaiKhoanKhachHang"
        WHERE "Id" = ?
        """;
    List<Map<String, Object>> tk = jdbcTemplate.queryForList(sqlCheckAccount, id);
    if (tk.isEmpty())
      throw new Error("Account doesnt exists");
  }
}
