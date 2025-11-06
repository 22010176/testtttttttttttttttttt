using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/don-hang")]
public class DonHangController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly string serverUrl = "http://localhost:8083/api/donhang";

  [HttpPost]
  public async Task<IActionResult> TaoDonHang(int donHang = 5)
  {
    try
    {
      Random random = new();
      List<TaiKhoanKhachHang> taiKhoanKhachHang = await dbContext.TaiKhoanKhachHang.ToListAsync();
      List<SanPham> sanPham = await dbContext.SanPham.ToListAsync();
      List<GianHang> gianHang = await dbContext.GianHang.ToListAsync();
      List<PhienBanSanPham?>? phienBanSanPham = [.. sanPham
        .OrderBy(sanPham => sanPham.NguoiBanId)
        .Select(i =>
          dbContext.PhienBanSanPham
            .Where(j => j.SanPhamId == i.Id && j.NgayTao <= DateTime.UtcNow)
            .OrderByDescending(i => i.NgayTao)
            .Take(1)
            .ToList()
            .FirstOrDefault()
        )];

      List<TaoDonHangRequest> taoDonHangRequest = [];
      foreach (var kh in taiKhoanKhachHang)
      {
        for (int i = 0; i < donHang; i++)
        {

          List<PhienBanSanPham> _phienBanSanPham = [.. phienBanSanPham];
          TaoDonHangRequest request = new()
          {
            KhachHangId = kh.Id,
            LoaiHinhThanhToan = random.Next(2) == 0 ? LoaiHinhThanhToanDto.VN_PAY : LoaiHinhThanhToanDto.KHI_NHAN_HANG,
            SanPham = []
          };

          int len = random.Next(1, donHang);
          for (int j = 0; j < len; j++)
          {
            int _index = random.Next(_phienBanSanPham.Count);
            var item = _phienBanSanPham[_index];
            _phienBanSanPham.RemoveAt(_index);
            request.SanPham.Add(new()
            {
              PhienBanSanPhamId = item.Id,
              SoLuong = random.Next(1, 50)
            });
          }
          taoDonHangRequest.Add(request);
        }
      }

      await Parallel.ForEachAsync(taoDonHangRequest, async (data, c) =>
      {
        var body = await GenerateRequest.CreateRequest(data, serverUrl, RequestMethod.POST);
        Console.WriteLine($"TaoDonHang: {body}");
      });
      return Ok(taoDonHangRequest);
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpDelete]
  public async Task<IActionResult> XoaDonHang()
  {
    try
    {
      dbContext.CapNhatTrangThaiDonHang.RemoveRange(await dbContext.CapNhatTrangThaiDonHang.ToListAsync());
      dbContext.SanPhamDonHang.RemoveRange(await dbContext.SanPhamDonHang.ToListAsync());
      dbContext.DonHangKhachHang.RemoveRange(await dbContext.DonHangKhachHang.ToListAsync());
      await dbContext.SaveChangesAsync();
      return Ok();
    }
    catch (System.Exception)
    {

      throw;
    }
  }
}