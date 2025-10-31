using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class GianHang
{
  [Key]
  public int Id { get; set; }
  public string? TaiKhoanNguoiBanId { get; set; }

  public string? TenGianHang { get; set; }
}