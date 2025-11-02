using DatabaseModels;
using Microsoft.AspNetCore.Mvc;

namespace TestServer.Controllers;

[ApiController]
[Route("api/tai-khoan-khach-hang")]
public class TaiKhoanKhachHangController(IConfiguration config, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly HttpClient _http = new();


}