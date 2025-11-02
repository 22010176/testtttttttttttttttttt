using System.Text;
using System.Text.Json;
using DatabaseModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestServer.Utilities;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/tai-khoan-nguoi-ban")]
public class TakKhoanNguoiBanController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly HttpClient _http = new();

  [HttpPost("khoi-tao-tai-khoan-thu-nghiem")]
  public async Task<IActionResult> KhoiTaoTaiKhoanThuNghiem()
  {
    try
    {
      // Save seed data in app_settings?
      var data = new
      {
        hoTen = "test",
        soDienThoai = "0123456789",
        email = "abc@m.com",
        matKhau = "abc"
      };
      var json = JsonSerializer.Serialize(data);
      var content = new StringContent(json, Encoding.UTF8, "application/json");
      var response = await _http.PostAsync("http://localhost:5216/api/tai-khoan/register", content);
      var body = await response.Content.ReadAsStringAsync();
      return Ok(new ResponseFormat
      {
        Data = new
        {
          body,
          data
        },
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }

  [HttpPost("tao-tai-khoan-thu-nghiem")]
  public async Task<IActionResult> TaoTaiKhoanThuNghiem(int number = 10)
  {
    try
    {
      _ = Parallel.ForEachAsync(Enumerable.Range(0, number), async (n, b) =>
     {
       var data = new
       {
         hoTen = RandomGenerator.GenerateRandomString(5, 20),
         soDienThoai = RandomGenerator.GenerateRandomPhoneNumber(),
         email = RandomGenerator.GenerateRandomEmail(),
         matKhau = "abc"
       };
       var json = JsonSerializer.Serialize(data);
       var content = new StringContent(json, Encoding.UTF8, "application/json");

       var response = await _http.PostAsync("http://localhost:5216/api/tai-khoan/register", content, b);
       var body = await response.Content.ReadAsStringAsync(b);
       Console.WriteLine($"TaoTaiKhoanThuNghiem: {body}");
     });

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }

  [HttpDelete("xoa-tai-khoan-thu-nghiem")]
  public async Task<IActionResult> XoaTaiKhoanThuNghiem()
  {
    try
    {
      var user = await dbContext.TaiKhoanNguoiBan.ToListAsync();
      dbContext.TaiKhoanNguoiBan.RemoveRange(user);
      await dbContext.SaveChangesAsync();
      return Ok();
    }
    catch (Exception)
    {
      throw;
    }
  }
}

