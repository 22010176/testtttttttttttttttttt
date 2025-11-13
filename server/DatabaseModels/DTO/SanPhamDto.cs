using DatabaseModels.Models;
using Microsoft.AspNetCore.Http;
using Utilities;

namespace DatabaseModels.DTO;

public class CapNhatTrangThaiRequest
{
  public static CapNhatTrangThaiRequest Generate(string? sanPham, TrangThaiSanPham? trangThai = null)
  {
    Random random = new();
    var values = Enum.GetValues<TrangThaiSanPham>();
    return new()
    {
      SanPhamId = sanPham,
      TrangThaiSanPham = (TrangThaiSanPham)values.GetValue(random.Next(values.Count()))!
    };
  }
  public string? SanPhamId { get; set; }
  public TrangThaiSanPham TrangThaiSanPham { get; set; }
}

public class CapNhatHinhAnhRequest
{
  async public static Task<CapNhatHinhAnhRequest> Generate(string? sanPhamId, LoaiHinhAnhSanPham loai, int image_size)
  {
    Console.WriteLine("CapNhatHinhAnhRequest");
    return new CapNhatHinhAnhRequest()
    {
      SanPhamId = sanPhamId,
      LoaiHinhAnhSanPham = loai,
      File = await RandomGenerator.GenerateRandomImageStream(image_size, image_size)
    };
  }
  public string? SanPhamId { get; set; }
  public LoaiHinhAnhSanPham LoaiHinhAnhSanPham { get; set; }
  public IFormFile File { get; set; } = null!;
}

public class CapNhatSanPhamRequest
{
  public static CapNhatSanPhamRequest Generate(List<NganhHang> nganhHang, string nguoiBan, string sanPham = "")
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
      NgayTao = RandomGenerator.RandomUtcDate(new(1990, 1, 1), DateTime.UtcNow)
    };
  }
  public string? SanPhamId { get; set; }
  public string? NguoiBanId { get; set; }
  public string? NganhHangId { get; set; }
  public string? TenSanPham { get; set; }
  public string? MoTaSanPham { get; set; }
  public double GiaBan { get; set; }
  public DateTime NgayTao { get; set; }
}
