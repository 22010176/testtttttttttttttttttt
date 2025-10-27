using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace SellerServer.Controllers;

[ApiController]
[Route("api/san-pham")]
public class SanPhamController(IConfiguration configuration, AppDbContext dbContext, S3Service s3Service) : ControllerBase
{
  readonly IConfiguration config = configuration;
  readonly AppDbContext dbContext = dbContext;
  readonly S3Service s3 = s3Service;

  [HttpGet]
  public async Task<IActionResult> LayDanhSachSanPham([FromQuery] int nguoiBanId)
  {
    try
    {
      var danhSachSanPham = await dbContext.SanPham
        .Join(
          dbContext.PhienBanSanPham,
          sp => sp.Id,
          pb => pb.SanPhamId,
          (sp, pb) => new { sp, pb })
        .Where(i => i.sp.NguoiBanId == nguoiBanId)
        .OrderByDescending(i => i.pb.NgayTao)
        .Take(1)
        .Select(o => new
        {
          o.sp.Id,
          o.sp.NguoiBanId,
          TrangThaiSanPham = o.sp.TrangThaiSanPham.ToString(),
          PhienBanId = o.pb.Id,
          o.pb.TenSanPham,
          o.pb.MoTaSanPham,
          o.pb.GiaBan,
          NgayChinhSuaCuoi = o.pb.NgayTao,
          AnhBia = dbContext.MediaSanPham
            .Where(i => i.LoaiHinhAnhSanPham == LoaiHinhAnhSanPham.HINH_ANH_BIA)
            .OrderByDescending(i => i.NgayTao)
            .Select(i => i.Url)
            .FirstOrDefault(),
          DoanhSoBanHang = 0 // Cai dat sau
        }).ToListAsync();
      return Ok(new ResponseFormat()
      {
        Success = true,
        Message = "",
        Data = danhSachSanPham
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat()
      {
        Success = false,
        Message = err.Message,
        Data = null
      });
    }
  }

  [HttpPost("tai-hinh-anh")]
  [Consumes("multipart/form-data")]
  public async Task<IActionResult> CapNhatMediaSanPham([FromForm] CapNhatHinhAnhRequest file)
  {
    try
    {
      Console.WriteLine(file.LoaiHinhAnhSanPham);
      MediaSanPham mediaSanPham = new()
      {
        PhienBanSanPhamId = file.PhienBanSanPhamId,
        NgayTao = DateTime.UtcNow,
        Url = await s3.UploadFileAsync(file.File),
        LoaiHinhAnhSanPham = file.LoaiHinhAnhSanPham
      };
      // if (mediaSanPham.Url == null)
      await dbContext.MediaSanPham.AddAsync(mediaSanPham);
      await dbContext.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = mediaSanPham,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = null,
        Success = false,
        Message = err.Message
      });
    }
  }

  [HttpPost("cap-nhat-san-pham")]
  public async Task<IActionResult> CapNhatSanPham([FromBody] CapNhatSanPhamRequest request)
  {
    try
    {
      SanPham? sanPham = await dbContext.SanPham.FirstOrDefaultAsync(i => i.Id == request.SanPhamId);
      if (sanPham == null)
      {
        if (request.NganhHangId == null) throw new Exception("Nguoi ban khong hop le");
        sanPham = new()
        {
          NguoiBanId = request.NguoiBanId,
          TrangThaiSanPham = TrangThaiSanPham.BAN_NHAP,
        };
        await dbContext.SanPham.AddAsync(sanPham);
        await dbContext.SaveChangesAsync();
      }

      PhienBanSanPham phienBanSanPham = new()
      {
        NganhHangId = request.NganhHangId,
        SanPhamId = sanPham.Id,
        TenSanPham = request.TenSanPham,
        MoTaSanPham = request.MoTaSanPham,
        GiaBan = request.GiaBan,
        NgayTao = request.NgayTao,
        // NgayTao = DateTime.UtcNow
      };
      await dbContext.PhienBanSanPham.AddAsync(phienBanSanPham);
      await dbContext.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Message = "Cập nhật sản phẩm thành công",
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

  [HttpPut("cap-nhat-trang-thai")]
  public async Task<IActionResult> CapNhatTrangThaiSanPham(CapNhatTrangThaiRequest request)
  {
    try
    {
      SanPham? sanPham = await dbContext.SanPham.FirstOrDefaultAsync(i => i.Id == request.SanPhamId);
      if (sanPham == null) throw new Exception("");

      sanPham.TrangThaiSanPham = request.TrangThaiSanPham;
      await dbContext.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }

  }
}

// public class CapNhatTrangThaiRequest
// {
//   public int SanPhamId { get; set; }
//   public TrangThaiSanPham TrangThaiSanPham { get; set; }
// }

// public class CapNhatHinhAnhRequest
// {
//   public int PhienBanSanPhamId { get; set; }
//   public LoaiHinhAnhSanPham LoaiHinhAnhSanPham { get; set; }
//   public IFormFile File { get; set; } = null!;
// }

// public class CapNhatSanPhamRequest
// {
//   public int? SanPhamId { get; set; }
//   public int? NguoiBanId { get; set; }
//   public int? NganhHangId { get; set; }
//   public string? TenSanPham { get; set; }
//   public string? MoTaSanPham { get; set; }
//   public double GiaBan { get; set; }
//   public DateTime NgayTao { get; set; }
// }

public class CapNhatTrangThaiSanPhamRequest
{

}