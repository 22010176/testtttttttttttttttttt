using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/gio-hang")]
public class GioHangController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly string serverUrl = "http://localhost:8083";

  [HttpPost]
  public async Task<IActionResult> TaoGioHang(int gioHang)
  {
    try
    {
      Random random = new();
      List<TaiKhoanKhachHang> taiKhoanKhachHang = await dbContext.TaiKhoanKhachHang.ToListAsync();
      List<SanPham> sanPham = await dbContext.SanPham.ToListAsync();

      List<TaoGioHangRequest> taoGioHangRequest = [];
      for (int i = 0; i < gioHang; i++)
      {
        taoGioHangRequest.Add(new()
        {
          KhachHangId = taiKhoanKhachHang.ElementAt(random.Next(taiKhoanKhachHang.Count)).Id,
          SanPhamId = sanPham.ElementAt(random.Next(taiKhoanKhachHang.Count)).Id,
          SoLuong = 1
        });
      }
      _ = Parallel.ForEachAsync(taoGioHangRequest, async (data, c) =>
      {
        var body = await GenerateRequest.CreateRequest(data, $"{serverUrl}/api/giohang", RequestMethod.POST);
        Console.WriteLine($"TaoGioHang: {body}");
      });
      return Ok();
    }
    catch (System.Exception)
    {

      throw;
    }
  }

  [HttpDelete]
  public async Task<IActionResult> XoaGioHang()
  {
    try
    {
      dbContext.GioHangKhachHang.RemoveRange(await dbContext.GioHangKhachHang.ToListAsync());
      await dbContext.SaveChangesAsync();
      return Ok();
    }
    catch (System.Exception)
    {
      throw;
    }
  }
}