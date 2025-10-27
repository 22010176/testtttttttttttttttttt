using DatabaseModels.Models;
using Microsoft.AspNetCore.Http;
using Utilities;

namespace DatabaseModels.DTO;

public class CapNhatTrangThaiRequest
{
  public static CapNhatTrangThaiRequest Generate(List<NganhHang> nganhHang, int nguoiBan, int sanPham = -1)
  {
    Random random = new();
    return new()
    {

    };
  }
  public int SanPhamId { get; set; }
  public TrangThaiSanPham TrangThaiSanPham { get; set; }
}

public class CapNhatHinhAnhRequest
{
  async public static Task<CapNhatHinhAnhRequest> Generate(int phienBanSanPham, LoaiHinhAnhSanPham loai, int image_size)
  {
    return new CapNhatHinhAnhRequest()
    {
      PhienBanSanPhamId = phienBanSanPham,
      LoaiHinhAnhSanPham = loai,
      File = await RandomGenerator.GenerateRandomImageStream(image_size, image_size)
    };
  }
  public int PhienBanSanPhamId { get; set; }
  public LoaiHinhAnhSanPham LoaiHinhAnhSanPham { get; set; }
  public IFormFile File { get; set; } = null!;
}

public class CapNhatSanPhamRequest
{
  public static CapNhatSanPhamRequest Generate(List<NganhHang> nganhHang, int nguoiBan, int sanPham = -1)
  {
    Random random = new();
    return new()
    {
      SanPhamId = sanPham,
      NguoiBanId = nguoiBan,
      NganhHangId = nganhHang.ElementAt(random.Next(nganhHang.Count)).Id,
      TenSanPham = RandomGenerator.GenerateRandomString(5, 10),
      MoTaSanPham = RandomGenerator.GenerateRandomString(50, 200),
      GiaBan = random.NextDouble() * 999_999_999,
      NgayTao = RandomGenerator.RandomUtcDate(new(1990, 1, 1), new(2030, 1, 1))
    };
  }
  public int? SanPhamId { get; set; }
  public int? NguoiBanId { get; set; }
  public int? NganhHangId { get; set; }
  public string? TenSanPham { get; set; }
  public string? MoTaSanPham { get; set; }
  public double GiaBan { get; set; }
  public DateTime NgayTao { get; set; }
}
