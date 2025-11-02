package CustomerServer.dto.diachi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThemDiaChiRequest {
  private String hoTen;
  private String soDienThoai;
  private String diaChiCuThe;
}
