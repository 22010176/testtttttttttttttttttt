package CustomerServer.dto.taikhoan;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SuaThongTinTaiKhoanRequest {
  String khachHangId;
  String hoTen;
  GioiTinh gioiTinh;
  Date ngaySinh;
}