package CustomerServer.dto.diachi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThemDiaChiRequest {
  private String hoTen;
  private String soDienThoai;
  private String diaChiCuThe;
}
