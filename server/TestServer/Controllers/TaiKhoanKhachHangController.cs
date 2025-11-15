using System.Text;
using System.Text.Json;
using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/tai-khoan-khach-hang")]
public class TaiKhoanKhachHangController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly HttpClient _http = new();
  readonly string serverUrl = "http://localhost:8083";

  [HttpPost]
  public async Task<IActionResult> TaoTaiKhoanKhachHang(int taiKhoan = 10)
  {
    try
    {
      List<DangKiTaiKhoanKhachHangRequest> dangKiTaiKhoanKhachHangRequest = [];
      for (int i = 0; i < taiKhoan; i++)
      {
        dangKiTaiKhoanKhachHangRequest.Add(DangKiTaiKhoanKhachHangRequest.Generate());
      }

      await Parallel.ForEachAsync(dangKiTaiKhoanKhachHangRequest, async (data, c) =>
      {
        var body = await GenerateRequest.CreateRequest(data, $"{serverUrl}/api/taikhoan/dang-ki", RequestMethod.POST);
        Console.WriteLine($"TaoTaiKhoanKhachHang: {body}");
      });

      return Ok(new ResponseFormat
      {

      });
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpPost("them-dia-chi")]
  public async Task<IActionResult> TaoDiaChi([FromQuery] int diaChi = 10)
  {
    try
    {
      List<TaiKhoanKhachHang> taiKhoanKhachHang = await dbContext.TaiKhoanKhachHang.ToListAsync();
      List<ThemDiaChiRequest> themDiaChiRequest = [];
      foreach (var item in taiKhoanKhachHang)
      {
        for (int i = 0; i < diaChi; ++i)
        {
          themDiaChiRequest.Add(ThemDiaChiRequest.Generate(item.Id));
        }
      }

      await Parallel.ForEachAsync(themDiaChiRequest, async (data, c) =>
      {
        var body = await GenerateRequest.CreateRequest(data, $"{serverUrl}/api/diachi", RequestMethod.POST);
        Console.WriteLine($"TaoDiaChi: {body}");
      });

      return Ok(new ResponseFormat
      {
      });
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpDelete]
  public async Task<IActionResult> XoaTaiKhoanKhachHang()
  {
    try
    {
      dbContext.DiaChiGiaoHang.RemoveRange(await dbContext.DiaChiGiaoHang.ToListAsync());
      dbContext.TaiKhoanKhachHang.RemoveRange(await dbContext.TaiKhoanKhachHang.ToListAsync());
      await dbContext.SaveChangesAsync();

      return Ok();
    }
    catch (Exception)
    {
      throw;
    }
  }
}