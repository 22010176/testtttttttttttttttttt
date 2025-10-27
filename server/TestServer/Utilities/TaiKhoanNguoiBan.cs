using DatabaseModels.Models;
using Utilities;

namespace TestServer.Utilities;

public static class TaiKhoanNguoiBanUtil
{
  static readonly Random random = new();
  public static TaiKhoanNguoiBan GenerateTaiKhoanNguoiBan()
  {
    return new()
    {
      Email = RandomGenerator.GenerateRandomEmail(),
      MatKhauBam = RandomGenerator.GenerateRandomString(5, 20),
      SoDienThoai = RandomGenerator.GenerateRandomPhoneNumber()
    };
  }
}