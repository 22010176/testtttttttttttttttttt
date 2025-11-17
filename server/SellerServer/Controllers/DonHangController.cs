using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace SellerServer.Controllers;

[ApiController]
[Route("api/don-hang")]
public class DonHangController(IConfiguration configuration, AppDbContext dbContext) : ControllerBase
{
  readonly IConfiguration _config = configuration;
  readonly AppDbContext dbContext = dbContext;

  [HttpGet]
  public async Task<IActionResult> LayDanhSachDonHang(string nguoiBanId)
  {
    try
    {
      // var sanPham = await dbContext.SanPham
      //   .Where(i => i.NguoiBanId == nguoiBanId)
      //   .Select(sp => new
      //   {
      //     sp.Id,
      //     sp.NguoiBanId,
      //     sp.TrangThaiSanPham
      //   })
      //   .ToListAsync();

      // var phienBanSanPham = (await dbContext.PhienBanSanPham.ToListAsync())
      //   .Where(j => sanPham.Exists(sp => sp.Id == j.SanPhamId))
      //   .ToList();

      // var sanPhamDonHang = (await dbContext.SanPhamDonHang.ToListAsync())
      //   .Where(j => phienBanSanPham.Exists(pbsp => pbsp.Id == j.PhienBanSanPhamId))
      //   .ToList();

      // var donHang = (await dbContext.DonHangKhachHang.ToListAsync())
      //   .Where(j => sanPhamDonHang.Exists(i => i.DonHangId == j.Id))
      //   .ToList();

      var result = await (
            from dh in dbContext.DonHangKhachHang
            join sdh in dbContext.SanPhamDonHang on dh.Id equals sdh.DonHangId
            join pb in dbContext.PhienBanSanPham on sdh.PhienBanSanPhamId equals pb.Id
            join sp in dbContext.SanPham on pb.SanPhamId equals sp.Id
            join kh in dbContext.TaiKhoanKhachHang on dh.KhachHangId equals kh.Id
            where sp.NguoiBanId == nguoiBanId
            orderby dh.NgayTao descending
            select new
            {
              DonHangId = dh.Id,
              NgayDat = dh.NgayTao,
              TaiKhoanKhachHangId = kh.Id,
              TrangThaiDonHang = (
                from tt in dbContext.CapNhatTrangThaiDonHang
                where tt.DonHangId == dh.Id
                orderby tt.ThoiGianTao descending
                select new
                {
                  tt.Id,
                  TrangThai = tt.TrangThaiDonHang.ToString(),
                  tt.ThoiGianTao
                }
              ).ToList(),
              SoDienThoai = (
                from dc in dbContext.DiaChiGiaoHang
                where dc.TaiKhoanKhachHangId == kh.Id
                orderby dc.Id descending
                select dc.SoDienThoai
              ).FirstOrDefault(),
              HoTen = (
                from dc in dbContext.DiaChiGiaoHang
                where dc.TaiKhoanKhachHangId == kh.Id
                orderby dc.Id descending
                select dc.HoTen
              ).FirstOrDefault(),
              sdh.PhienBanSanPhamId,
              sdh.SoLuong,
              pb.SanPhamId,
              pb.TenSanPham,
              pb.GiaBan,
            }
      ).ToListAsync();
      return Ok(new ResponseFormat
      {
        Data = result
      });
    }
    catch (Exception)
    {

      throw;
    }
  }

  [HttpPost]
  public async Task<IActionResult> CapNhatTrangThaiDonHang(CapNHatTrangThaiDonHangRequest request)
  {
    // try
    // {
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
    // }
    // catch (Exception)
    // {

    //   return BadRequest(new ResponseFormat()
    //   {
    //     Success = false
    //   });
    //   throw;
    // }
  }
}