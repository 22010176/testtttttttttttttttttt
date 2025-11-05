package CustomerServer.dto.donhang;

import java.util.List;

import lombok.Getter;

@Getter
public class TaoDonHangRequest {
  private String khachHangId;
  private LoaiHinhThanhToan loaiHinhThanhToan;

  private List<SanPhamDonHang> sanPham;
}