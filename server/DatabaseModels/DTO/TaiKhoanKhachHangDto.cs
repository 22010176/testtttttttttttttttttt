using Utilities;

namespace DatabaseModels.DTO;

public class DangKiTaiKhoanKhachHangRequest
{
  public static DangKiTaiKhoanKhachHangRequest Generate()
  {
    return new()
    {
      Email = RandomGenerator.GenerateRandomEmail(),
      SoDienThoai = RandomGenerator.GenerateRandomPhoneNumber(),
      MatKhau = "abc",
      HoTen = RandomGenerator.GenerateRandomString(5, 20)
    };
  }
  public string? Email { get; set; }
  public string? SoDienThoai { get; set; }
  public string? MatKhau { get; set; }
  public string? HoTen { get; set; }
}