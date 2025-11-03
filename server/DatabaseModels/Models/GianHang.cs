using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class GianHang
{
  [Key]
  public string Id { get; set; } = null!;
  public string? NguoiBanId { get; set; }

  public string? TenGianHang { get; set; }
  public string? MoTaShop { get; set; }
  public string? HinhAnhDaiDien { get; set; }

  public TaiKhoanNguoiBan? TaiKhoanNguoiBan { get; set; }
}