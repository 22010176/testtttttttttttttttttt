package CustomerServer.dto.donhang;

import java.util.List;

import lombok.Data;

@Data
public class TaoDonHangRequest {
  private String khachHangId;
  private LoaiHinhThanhToan loaiHinhThanhToan;

  private List<SanPhamDonHang> sanPham;
}