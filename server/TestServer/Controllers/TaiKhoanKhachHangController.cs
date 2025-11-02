using DatabaseModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace TestServer.Controllers;

[ApiController]
[Route("api/tai-khoan-khach-hang")]
public class TaiKhoanKhachHangController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly HttpClient _http = new();

  [HttpPost]
  public async Task<IActionResult> TaoTaiKhoanKhachHang()
  {
    return Ok();
  }

  [HttpDelete]
  public async Task<IActionResult> XoaTaiKhoanKhachHang()
  {
    return Ok();
  }
}