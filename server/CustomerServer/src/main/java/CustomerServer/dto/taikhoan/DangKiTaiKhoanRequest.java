package CustomerServer.dto.taikhoan;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DangKiTaiKhoanRequest {
  private String email;
  private String soDienThoai;
  private String matKhau;
  private String hoTen;
}