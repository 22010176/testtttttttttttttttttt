using DatabaseModels;
using Microsoft.AspNetCore.Mvc;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("api/tai-khoan-nguoi-ban")]
public class TakKhoanNguoiBanController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;

  [HttpPost("khoi-tao-tai-khoan-thu-nghiem")]
  public async Task<IActionResult> KhoiTaoTaiKhoanThuNghiem()
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
}