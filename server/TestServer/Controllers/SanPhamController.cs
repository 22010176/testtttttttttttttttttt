using System.Text;
using System.Text.Json;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestServer.Utilities;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/san-pham")]
public class SanPhamController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly HttpClient _http = new();
  readonly Random random = new();

  [HttpPost]
  public async Task<IActionResult> TaoSanPham(int sp = 100)
  {
    try
    {
      // Generate product
      List<TaiKhoanNguoiBan> taiKhoanNguoiBan = await dbContext.TaiKhoanNguoiBan.ToListAsync();
      List<NganhHang> nganhHang = await dbContext.NganhHang
        .Where(i => i.LaNhanh)
        .ToListAsync();

      _ = Parallel.ForEachAsync(taiKhoanNguoiBan, async (n, b) =>
      {
        List<SanPham> sanPham = [];
        await Parallel.ForEachAsync(Enumerable.Range(0, sp), async (a, b) =>
        {
          var data = new
          {
            sanPhamId = -1,
            nguoiBanId = n.Id,
            nganhHangId = nganhHang.ElementAt(random.Next(nganhHang.Count)).Id,
            tenSanPham = RandomGenerator.GenerateRandomString(5, 10),
            moTaSanPham = RandomGenerator.GenerateRandomString(50, 100),
            giaBan = random.NextDouble() * 999_999_999,
            ngayTao = RandomGenerator.RandomUtcDate(new(1990, 1, 1), new(2030, 1, 1))
          };
          var json = JsonSerializer.Serialize(data);
          var content = new StringContent(json, Encoding.UTF8, "application/json");

          var response = await _http.PostAsync("http://localhost:5216/api/san-pham/cap-nhat-san-pham", content, b);
          var body = await response.Content.ReadAsStringAsync(b);
          Console.WriteLine($"TaoSanPham:  {body}");
        });
      });

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception)
    {
      return BadRequest();
    }
  }

  [HttpPost]
  public async Task<IActionResult> TaoPhienBanSanPham(int phienBan, int media)
  {
    try
    {
      return Ok();
    }
    catch (System.Exception)
    {

      throw;
    }
  }

  [HttpDelete]
  public async Task<IActionResult> XoaSanPham()
  {
    try
    {
      dbContext.MediaSanPham.RemoveRange(await dbContext.MediaSanPham.ToListAsync());
      dbContext.PhienBanSanPham.RemoveRange(await dbContext.PhienBanSanPham.ToListAsync());
      dbContext.SanPham.RemoveRange(await dbContext.SanPham.ToListAsync());
      await dbContext.SaveChangesAsync();

      return Ok();
    }
    catch (Exception)
    {

      throw;
    }
  }
}