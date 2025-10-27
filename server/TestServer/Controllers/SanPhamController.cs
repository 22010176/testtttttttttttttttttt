using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using DatabaseModels;
using DatabaseModels.DTO;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
  readonly int IMAGE_SIZE = 100;

  [HttpPost("san-pham")]
  public async Task<IActionResult> TaoSanPham(int sp = 10)
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

  [HttpPost("phien-ban-san-pham")]
  public async Task<IActionResult> TaoPhienBanSanPham(int phienBan = 10)
  {
    try
    {
      List<SanPham> sanPham = await dbContext.SanPham
        .OrderByDescending(i => i.Id)
        .ToListAsync();
      List<NganhHang> nganhHang = await dbContext.NganhHang
        .Where(i => i.LaNhanh)
        .ToListAsync();

      List<CapNhatSanPhamRequest> capNhatSanPhamRequest = [];
      foreach (var item in sanPham)
      {
        for (int i = 0; i < phienBan; ++i)
        {
          capNhatSanPhamRequest.Add(new()
          {
            SanPhamId = item.Id,
            NguoiBanId = item.NguoiBanId,
            NganhHangId = nganhHang.ElementAt(random.Next(nganhHang.Count)).Id,
            TenSanPham = RandomGenerator.GenerateRandomString(5, 10),
            MoTaSanPham = RandomGenerator.GenerateRandomString(50, 200),
            GiaBan = random.NextDouble() * 999_999_999,
            NgayTao = RandomGenerator.RandomUtcDate(new(1990, 1, 1), new(2030, 1, 1))
          });
        }
      }

      _ = Parallel.ForEachAsync(capNhatSanPhamRequest, async (data, c) =>
      {
        var json = JsonSerializer.Serialize(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _http.PostAsync("http://localhost:5216/api/san-pham/cap-nhat-san-pham", content, c);
        var body = await response.Content.ReadAsStringAsync(c);
        Console.WriteLine($"TaoPhienBanSanPham: spID({data.SanPhamId}, {data})  {body}");
      });
      return Ok(sanPham);
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpPost("tai-media")]
  public async Task<IActionResult> TaiHinhAnh()
  {
    try
    {
      var tasks = (await dbContext.PhienBanSanPham.ToListAsync())
      .SelectMany(pbsp =>
      {
        var list = new List<Task<CapNhatHinhAnhRequest>>
        {
          // HINH_ANH_BIA
          Task.Run(async () => new CapNhatHinhAnhRequest
          {
            PhienBanSanPhamId = pbsp.Id,
            LoaiHinhAnhSanPham = LoaiHinhAnhSanPham.HINH_ANH_BIA,
            File = await RandomGenerator.GenerateRandomImageStream(IMAGE_SIZE, IMAGE_SIZE)
          }),

          // VIDEO_SAN_PHAM
          Task.Run(async () => new CapNhatHinhAnhRequest
          {
            PhienBanSanPhamId = pbsp.Id,
            LoaiHinhAnhSanPham = LoaiHinhAnhSanPham.VIDEO_SAN_PHAM,
            File = await RandomGenerator.GenerateRandomImageStream(IMAGE_SIZE, IMAGE_SIZE)
          })
        };

        // 10 x HINH_MINH_HOA
        for (int i = 0; i < 10; i++)
        {
          list.Add(Task.Run(async () => new CapNhatHinhAnhRequest
          {
            PhienBanSanPhamId = pbsp.Id,
            LoaiHinhAnhSanPham = LoaiHinhAnhSanPham.HINH_MINH_HOA,
            File = await RandomGenerator.GenerateRandomImageStream(IMAGE_SIZE, IMAGE_SIZE)
          }));
        }
        return list;
      }).ToList();

      _ = Parallel.ForEachAsync((await Task.WhenAll(tasks)).ToList(), async (data, c) =>
        {
          var stream = new StreamContent(data.File.OpenReadStream());
          stream.Headers.ContentType = new MediaTypeHeaderValue(data.File.ContentType);

          using var form = new MultipartFormDataContent
          {
            { new StringContent(data.PhienBanSanPhamId.ToString()), nameof(CapNhatHinhAnhRequest.PhienBanSanPhamId) },
            { new StringContent(data.LoaiHinhAnhSanPham.ToString()), nameof(CapNhatHinhAnhRequest.LoaiHinhAnhSanPham) },
            { stream, nameof(CapNhatHinhAnhRequest.File), data.File.FileName }
          };
          var response = await _http.PostAsync("http://localhost:5216/api/san-pham/tai-hinh-anh", form, c);
          var responseString = await response.Content.ReadAsStringAsync(c);

          Console.WriteLine($"TaiHinhAnh: {responseString}");
        });

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception)
    {

      throw;
    }
  }

  [HttpPost]
  public async Task<IActionResult> SinhSanPham()
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