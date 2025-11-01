package CustomerServer.dto.taikhoan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DangNhapTaiKhoanRequest {
  private String email;
  private String matKhau;
}