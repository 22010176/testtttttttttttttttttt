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
    // try
    // {
    Random random = new();
    List<TaiKhoanNguoiBan> taiKhoanNguoiBan = await dbContext.TaiKhoanNguoiBan.ToListAsync();
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
        TaiKhoanNguoiBan nguoiBan = taiKhoanNguoiBan.ElementAt(random.Next(taiKhoanNguoiBan.Count));
        List<PhienBanSanPham> _phienBanSanPham = [.. phienBanSanPham
            .Join(
              dbContext.SanPham,
              pbsp => pbsp!.SanPhamId,
              sp => sp.Id,
              (pbsp,sp)=>new {pbsp, sp})
              .Where(i=>i.sp.NguoiBanId == nguoiBan.Id)
            .Select(i=>i.pbsp!)];

        TaoDonHangRequest request = new()
        {
          KhachHangId = kh.Id,
          LoaiHinhThanhToan = random.Next(2) == 0 ? LoaiHinhThanhToanDto.VN_PAY : LoaiHinhThanhToanDto.KHI_NHAN_HANG,
          SanPham = []
        };

        int len = Math.Min(_phienBanSanPham.Count, random.Next(1, donHang));
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
    // }
    // catch (Exception)
    // {
    //   throw;
    // }
  }

  [HttpPost("trang-thai-don-hang")]
  public async Task<IActionResult> TaoTrangThaiDonHang()
  {
    Random random = new();
    List<DonHangKhachHang> donHangKhachHang = await dbContext.DonHangKhachHang.ToListAsync();
    List<List<CapNHatTrangThaiDonHangRequest>> requests = [];
    var _trangThai = Enum.GetValues<TrangThaiDonHang>()
      .Where(i => i != TrangThaiDonHang.HUY_DON_HANG)
      .Select(i => i)
      .ToList();

    dbContext.CapNhatTrangThaiDonHang.RemoveRange(await dbContext.CapNhatTrangThaiDonHang.ToListAsync());
    await dbContext.SaveChangesAsync();
    foreach (var donHang in donHangKhachHang)
    {
      int count = random.Next(1, _trangThai.Count);
      List<CapNHatTrangThaiDonHangRequest> trangThai = [];
      for (int i = 0; i < count; i++)
      {
        trangThai.Add(new()
        {
          DonHangId = donHang.Id,
          NoiDungCapNhat = RandomGenerator.GenerateRandomString(10, 20),
          TrangThaiDonHang = _trangThai.ElementAt(i)
        });
      }
      requests.Add(trangThai);
    }
    await Parallel.ForEachAsync(requests, async (data, c) =>
    {
      foreach (var item in data)
      {
        var body = await GenerateRequest.CreateRequest(item, "http://localhost:5216/api/don-hang", RequestMethod.POST);
        Console.WriteLine($"TaoTrangThaiDonHang: {body}");
      }
    });
    return Ok(requests);
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