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
  // readonly HttpClient _http = new();
  readonly int IMAGE_SIZE = 100;
  readonly string serverUrl = "http://localhost:5216";

  [HttpPost("them-san-pham")]
  public async Task<IActionResult> TaoSanPham(int sp = 10)
  {
    // return BadRequest();
    try
    {
      // Generate product
      List<TaiKhoanNguoiBan> taiKhoanNguoiBan = await dbContext.TaiKhoanNguoiBan.ToListAsync();
      List<NganhHang> nganhHang = await dbContext.NganhHang
        .Where(i => i.NganhHangChaId == null)
        .ToListAsync();

      List<CapNhatSanPhamRequest> sanPham = [];
      foreach (var nguoiBan in taiKhoanNguoiBan)
      {
        for (int i = 0; i < sp; i++)
        {
          sanPham.Add(CapNhatSanPhamRequest.Generate(nganhHang, nguoiBan.Id));
        }
      }
      await Parallel.ForEachAsync(sanPham, async (data, b) =>
        {
          var body = await GenerateRequest.CreateRequest(data, $"{serverUrl}/api/san-pham/cap-nhat-san-pham", RequestMethod.POST);
          Console.WriteLine($"TaoSanPham: {body}");
        });

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(err);
    }
  }

  [HttpPost("them-san-pham/{id}")]
  public async Task<IActionResult> TaoSanPham(string id, int sp = 10)
  {
    // return BadRequest();
    try
    {
      // Generate product
      List<NganhHang> nganhHang = await dbContext.NganhHang
        .Where(i => i.LaNhanh)
        .ToListAsync();

      List<CapNhatSanPhamRequest> sanPham = [];
      for (int i = 0; i < sp; i++)
      {
        CapNhatSanPhamRequest request = CapNhatSanPhamRequest.Generate(nganhHang, id.ToString());
        sanPham.Add(request);
      }
      await Parallel.ForEachAsync(sanPham, async (data, b) =>
        {
          HttpClient _http = new();
          var json = JsonSerializer.Serialize(data);
          var content = new StringContent(json, Encoding.UTF8, "application/json");
          var response = await _http.PostAsync("http://localhost:5216/api/san-pham/cap-nhat-san-pham", content, b);
          var body = await response.Content.ReadAsStringAsync(b);
          Console.WriteLine($"TaoSanPham: {body}");
        });

      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(err);
    }
  }

  [HttpPost("them-phien-ban-san-pham")]
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
          capNhatSanPhamRequest.Add(CapNhatSanPhamRequest.Generate(nganhHang, item.NguoiBanId!, item.Id));
        }
      }

      await Parallel.ForEachAsync(capNhatSanPhamRequest, async (data, c) =>
      {
        HttpClient _http = new();
        var json = JsonSerializer.Serialize(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _http.PostAsync("http://localhost:5216/api/san-pham/cap-nhat-san-pham", content, c);
        var body = await response.Content.ReadAsStringAsync(c);
        Console.WriteLine($"TaoPhienBanSanPham: spID({data.SanPhamId})  {body}");
      });
      return Ok(sanPham);
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpPost("them-media")]
  public async Task<IActionResult> TaoMediaSanPham()
  {
    try
    {
      var tasks = (await dbContext.SanPham.ToListAsync())
      .SelectMany(sp =>
      {
        var list = new List<Task<CapNhatHinhAnhRequest>>
        {
          // HINH_ANH_BIA
          Task.Run(async () => await CapNhatHinhAnhRequest.Generate(sp.Id, LoaiHinhAnhSanPham.HINH_ANH_BIA,IMAGE_SIZE)),
          // VIDEO_SAN_PHAM
          Task.Run(async () => await CapNhatHinhAnhRequest.Generate(sp.Id, LoaiHinhAnhSanPham.VIDEO_SAN_PHAM,IMAGE_SIZE)),
        };

        // 10 x HINH_MINH_HOA
        for (int i = 0; i < 10; i++)
        {
          list.Add(Task.Run(async () => await CapNhatHinhAnhRequest.Generate(sp.Id, LoaiHinhAnhSanPham.HINH_MINH_HOA, IMAGE_SIZE)));
        }
        return list;
      }).ToList();

      await Parallel.ForEachAsync((await Task.WhenAll(tasks)).ToList(), async (data, c) =>
        {
          var _http = new HttpClient();
          var stream = new StreamContent(data.File.OpenReadStream());
          stream.Headers.ContentType = new MediaTypeHeaderValue(data.File.ContentType);

          using var form = new MultipartFormDataContent
          {
            { new StringContent(data.SanPhamId!.ToString()), nameof(CapNhatHinhAnhRequest.SanPhamId) },
            { new StringContent(data.LoaiHinhAnhSanPham!.ToString()), nameof(CapNhatHinhAnhRequest.LoaiHinhAnhSanPham) },
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
  public async Task<IActionResult> SinhSanPham(int sanPham, int phienBanSanPham)
  {
    try
    {
      Console.WriteLine("TaoSanPham");
      await TaoSanPham(sanPham);

      Console.WriteLine("TaoPhienBanSanPham");
      await TaoPhienBanSanPham(phienBanSanPham);

      Console.WriteLine("TaoMediaSanPham");
      await TaoMediaSanPham();

      return Ok();
    }
    catch (Exception)
    {

      return BadRequest();
    }
  }

  [HttpPut("cap-nhat-trang-thai")]
  public async Task<IActionResult> CapNhatTrangThaiSanPham(TrangThaiSanPham trangThaiSanPham)
  {
    try
    {

      List<SanPham> sanPham = await dbContext.SanPham
        .Where(i => i.TrangThaiSanPham != trangThaiSanPham)
        .ToListAsync();

      List<CapNhatTrangThaiRequest> capNhatTrangThaiRequest = [];
      foreach (var item in sanPham)
      {
        capNhatTrangThaiRequest.Add(new()
        {
          SanPhamId = item.Id,
          TrangThaiSanPham = trangThaiSanPham
        });
      }

      await Parallel.ForEachAsync(capNhatTrangThaiRequest, async (data, c) =>
      {
        var json = JsonSerializer.Serialize(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        HttpClient _http = new();
        var response = await _http.PutAsync("http://localhost:5216/api/san-pham/cap-nhat-trang-thai", content, c);
        var body = await response.Content.ReadAsStringAsync(c);
        Console.WriteLine($"CapNhatTrangThaiSanPham: spID({data.SanPhamId})  {body}");
      });

      return Ok();
    }
    catch (Exception)
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