using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Utilities;

namespace SellerServer.Controllers;

[ApiController]
[Route("api/don-hang")]
public class DonHangController(IConfiguration configuration, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = configuration;
  readonly AppDbContext dbContext = dbContext;

  [HttpGet]
  public async Task<IActionResult> LayDanhSachDonHang()
  {
    try
    {
      return Ok();
    }
    catch (Exception)
    {

      throw;
    }
  }

  [HttpPost]
  public async Task<IActionResult> CapNhatTrangThaiDonHang(CapNHatTrangThaiDonHangRequest request)
  {
    try
    {
      CapNhatTrangThaiDonHang trangThai = new()
      {
        Id = Guid.NewGuid().ToString(),
        DonHangId = request.DonHangId,
        NoiDungCapNhat = request.NoiDungCapNhat,
        TrangThaiDonHang = request.TrangThaiDonHang,
        ThoiGianTao = DateTime.UtcNow
      };
      await dbContext.CapNhatTrangThaiDonHang.AddAsync(trangThai);
      await dbContext.SaveChangesAsync();
      return Ok(new ResponseFormat()
      {
        Success = true
      });
    }
    catch (Exception)
    {

      return BadRequest(new ResponseFormat()
      {
        Success = false
      });
      throw;
    }
  }
}