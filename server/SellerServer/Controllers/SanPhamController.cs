using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Utilities;
using Utilities.Aws;

namespace SellerServer.Controllers;

[ApiController]
// [Authorize]
[Route("api/san-pham")]
public class SanPhamController(IConfiguration configuration, AppDbContext dbContext, S3Service s3Service) : ControllerBase
{
  // readonly int TaiKhoanTestId = 1;
  readonly IConfiguration config = configuration;
  readonly AppDbContext dbContext = dbContext;
  readonly S3Service s3 = s3Service;

  [HttpGet("{sanPhamId}")]
  public async Task<IActionResult> LayThongTinChiTietSanPham(string sanPhamId)
  {
    try
    {
      var item = await dbContext.SanPham
        .Where(i => i.Id == sanPhamId)
        .Join(
          dbContext.PhienBanSanPham,
          sp => sp.Id,
          pbsp => pbsp.SanPhamId,
          (sp, pbsp) => new { sp, pbsp })
        .OrderByDescending(i => i.pbsp.NgayTao)
        .Take(1)
        .Select(i => new
        {
          IdSanPham = i.sp.Id,
          i.sp.TrangThaiSanPham,
          PhienBanSanPhamId = i.pbsp.Id,
          i.pbsp.TenSanPham,
          i.pbsp.MoTaSanPham,
          i.pbsp.GiaBan,
          NganhHangId = i.pbsp.NganhHang!.Id,
          i.pbsp.NganhHang.TenNganhHang,
          hinhAnh = dbContext.MediaSanPham
            .Where(i => i.SanPhamId == sanPhamId)
            .OrderBy(i => i.LoaiHinhAnhSanPham)
            .ThenByDescending(i => i.NgayTao)
            .Select(i => i.Url)
            .FirstOrDefault()
        })
        .ToListAsync();
      return Ok(new ResponseFormat
      {
        Data = item.FirstOrDefault(),
        Success = true
      });
    }
    catch (Exception)
    {
      throw;
    }
  }
  [HttpGet]
  public async Task<IActionResult> LayDanhSachSanPham(string nguoiBanId)
  {
    // TODO: process POST request
    try
    {
      // Console.WriteLine(nguoiBanId);
      var danhSachSanPham = await dbContext.SanPham
        .Where(sp => sp.NguoiBanId == nguoiBanId)
        // .Join(
        //   dbContext.PhienBanSanPham,
        //   sp => sp.Id,
        //   pb => pb.SanPhamId,
        //   (sp, pb) => new { sp, pb })
        // .OrderByDescending(i => i.pb.NgayTao)
        // .Take(1)
        .Select(o => new
        {
          o.Id,
          o.NguoiBanId,
          TrangThaiSanPham = o.TrangThaiSanPham.ToString(),
          pb = dbContext.PhienBanSanPham
            .Where(i => i.SanPhamId == o.Id)
            .OrderByDescending(i => i.NgayTao)
            .FirstOrDefault(),
          AnhBia = dbContext.MediaSanPham
           .Where(i =>
             i.LoaiHinhAnhSanPham == LoaiHinhAnhSanPham.HINH_ANH_BIA
             && i.SanPhamId == o.Id)
           .OrderByDescending(i => i.NgayTao)
           .Select(i => i.Url)
           .FirstOrDefault(),
          DoanhSoBanHang = 0 // Cai dat sau
        }).Select(o => new
        {
          o.Id,
          o.NguoiBanId,
          o.TrangThaiSanPham,
          o.AnhBia,
          o.DoanhSoBanHang,
          o.pb!.TenSanPham,
          o.pb.MoTaSanPham,
          o.pb.GiaBan,
          NganhHangId = o.pb.NganhHang!.Id,
          o.pb.NganhHang.TenNganhHang
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
      if (file.File == null || file.File.Length == 0) throw new Exception("File invalid");

      var uploadRoot = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
      if (!Directory.Exists(uploadRoot)) Directory.CreateDirectory(uploadRoot);

      var safeFileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName())
                          + Path.GetExtension(file.File.FileName);
      var filePath = Path.Combine(uploadRoot, safeFileName);
      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.File.CopyToAsync(stream);
      }

      // Console.WriteLine(file.LoaiHinhAnhSanPham);
      MediaSanPham mediaSanPham = new()
      {
        Id = Guid.NewGuid().ToString(),
        SanPhamId = file.SanPhamId,
        NgayTao = DateTime.UtcNow,
        // Url = await s3.UploadFileAsync(file.File),
        Url = $"http://localhost:5216/files/{safeFileName}",
        LoaiHinhAnhSanPham = file.LoaiHinhAnhSanPham
      };
      // if (mediaSanPham.Url == null)
      await dbContext.MediaSanPham.AddAsync(mediaSanPham);
      await dbContext.SaveChangesAsync();

      Console.WriteLine($"http://localhost:5216/files/{safeFileName}");
      return Ok(new ResponseFormat
      {
        Data = mediaSanPham,
        // Data = Path.Combine(Directory.GetCurrentDirectory(), "Uploads"),
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
          Id = Guid.NewGuid().ToString(),
          NguoiBanId = request.NguoiBanId,
          TrangThaiSanPham = TrangThaiSanPham.BAN_NHAP,
        };
        await dbContext.SanPham.AddAsync(sanPham);
        await dbContext.SaveChangesAsync();
      }

      PhienBanSanPham phienBanSanPham = new()
      {
        Id = Guid.NewGuid().ToString(),
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

      // List<MediaSanPham> mediaSanPham = await dbContext.MediaSanPham
      //   .Select(i => new MediaSanPham()
      //   {
      //     Id = Guid.NewGuid().ToString(),
      //     PhienBanSanPhamId = i.PhienBanSanPhamId,
      //     LoaiHinhAnhSanPham = i.LoaiHinhAnhSanPham,
      //     Url = i.Url,
      //     NgayTao = DateTime.UtcNow,
      //   })
      //   .Where(i => i.PhienBanSanPhamId == phienBanSanPham.Id)
      //   .OrderByDescending(i => i.LoaiHinhAnhSanPham)
      //   .ThenByDescending(i => i.NgayTao)
      //   .Take(10)
      //   .ToListAsync();

      // await dbContext.MediaSanPham.AddRangeAsync(mediaSanPham);
      // await dbContext.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Data = sanPham,
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