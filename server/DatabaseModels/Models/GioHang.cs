using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class GioHangKhachHang
{
  [Key]
  public string Id { get; set; } = null!;
  public string? SanPhamId { get; set; }
  public string? KhachHangId { get; set; }

  public uint SoLuong { get; set; }

  public SanPham? SanPham { get; set; }
  public TaiKhoanKhachHang? TaiKhoanKhachHang { get; set; }
}