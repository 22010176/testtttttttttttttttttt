

namespace DatabaseModels.DTO;

public class TaoDonHangRequest
{
  public string? KhachHangId { get; set; }
  public LoaiHinhThanhToanDto LoaiHinhThanhToan { get; set; }
  public List<SanPhamDonHangDto>? SanPhamDonHangDto { get; set; }
}

public class SanPhamDonHangDto
{
  public string? PhienBanSanPhamId { get; set; }
  public int SoLuong { get; set; }
}

public enum LoaiHinhThanhToanDto
{
  VN_PAY,
  KHI_NHAN_HANG
}