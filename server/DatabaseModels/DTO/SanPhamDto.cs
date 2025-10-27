using DatabaseModels.Models;
using Microsoft.AspNetCore.Http;


namespace DatabaseModels.DTO;

public class CapNhatTrangThaiRequest
{
  public int SanPhamId { get; set; }
  public TrangThaiSanPham TrangThaiSanPham { get; set; }
}

public class CapNhatHinhAnhRequest
{
  public int PhienBanSanPhamId { get; set; }
  public LoaiHinhAnhSanPham LoaiHinhAnhSanPham { get; set; }
  public IFormFile File { get; set; } = null!;
}

public class CapNhatSanPhamRequest
{
  public int? SanPhamId { get; set; }
  public int? NguoiBanId { get; set; }
  public int? NganhHangId { get; set; }
  public string? TenSanPham { get; set; }
  public string? MoTaSanPham { get; set; }
  public double GiaBan { get; set; }
  public DateTime NgayTao { get; set; }
}
