using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class GioHangKhachHang
{
  [Key]
  public int Id { get; set; }

  public int SanPhamId { get; set; }
  public int KhachHangId { get; set; }

  public uint SoLuong { get; set; }

  public SanPham? SanPham { get; set; }
  public TaiKhoanKhachHang? TaiKhoanKhachHang { get; set; }
}