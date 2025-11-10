

using DatabaseModels.Models;

namespace DatabaseModels.DTO;

public class TaoDonHangRequest
{
  public string? KhachHangId { get; set; }
  public string? LoaiHinhThanhToan { get; set; }
  public List<SanPhamDonHangDto>? SanPham { get; set; }
}

public class CapNHatTrangThaiDonHangRequest
{
  public string? DonHangId { get; set; }
  public string? NoiDungCapNhat { get; set; }
  public TrangThaiDonHang TrangThaiDonHang { get; set; }
}

public class SanPhamDonHangDto
{
  public string? PhienBanSanPhamId { get; set; }
  public int SoLuong { get; set; }
}

public static class LoaiHinhThanhToanDto
{
  public static string VN_PAY { get; } = "VN_PAY";
  public static string KHI_NHAN_HANG { get; } = "KHI_NHAN_HANG";
}