package CustomerServer.dto.giohang;

import lombok.Data;

@Data
public class ThemGioHangRequest {
  private String sanPhamId;
  private String khachHangId;
  private int soLuong;
}