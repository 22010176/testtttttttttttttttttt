using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Utilities;
using Utilities.Aws;

namespace SellerServer.Controllers;

[ApiController]
[Route("api/tai-khoan")]
public class TaiKhoanController(IConfiguration config, AppDbContext dbContext, EmailService emailService, AwsSecret secret) : ControllerBase
{
  readonly IConfiguration _config = config;
  readonly AppDbContext dbContext = dbContext;
  readonly EmailService emailService = emailService;
  readonly AwsSecret secret = secret;

  [HttpGet]
  public async Task<IActionResult> LayThonTinTaiKhoan(string taiKhoanId)
  {
    try
    {
      var item = await dbContext.TaiKhoanNguoiBan.Where(i => i.Id == taiKhoanId).FirstOrDefaultAsync();
      return Ok(new ResponseFormat()
      {
        Success = true,
        Data = item
      });
    }
    catch (System.Exception)
    {

      throw;
    }
  }

  [HttpPost("send")]
  public async Task<IActionResult> SendEmail([FromQuery] string to, [FromQuery] string subject, [FromQuery] string body)
  {
    await emailService.SendEmailAsync(to, subject, body);
    return Ok(new { Success = true, Message = "Email sent successfully." });
  }
  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterRequest request)
  {
    try
    {
      await RegisterRequest.ValidateRegisterRequest(dbContext, request);

      var (hash, salt) = AuthUtilities.GeneratePasswordHash(request.MatKhau!);
      string nguoiBanId = Guid.NewGuid().ToString();
      TaiKhoanNguoiBan nguoiDung = new()
      {
        Id = nguoiBanId,
        HoTen = request.HoTen,
        SoDienThoai = request.SoDienThoai,
        Email = request.Email,
        MatKhauBam = hash,
        Salt = salt,
      };
      await dbContext.TaiKhoanNguoiBan.AddAsync(nguoiDung);
      await dbContext.SaveChangesAsync();

      GianHang gianHang = new()
      {
        Id = Guid.NewGuid().ToString(),
        MoTaShop = "",
        TenGianHang = nguoiDung.HoTen,
        HinhAnhDaiDien = "",
        NguoiBanId = nguoiBanId
      };
      await dbContext.GianHang.AddAsync(gianHang);
      await dbContext.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Message = "Success",
        Success = true
      });
    }
    catch (Exception err)
    {

      return BadRequest(new ResponseFormat
      {
        Message = err.Message,
        Success = false,
      });
    }
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request)
  {
    try
    {
      await LoginRequest.ValidateLoginRequest(dbContext, request);
      TaiKhoanNguoiBan? nguoiDung = await dbContext.TaiKhoanNguoiBan.FirstOrDefaultAsync(i => i.Email == request.Email);

      var jwtSettings = _config.GetSection("Jwt");
      var claims = new[]
      {
        new Claim(ClaimTypes.Name, request.Email),
        new Claim(ClaimTypes.Role, "Seller") // example role
      };

      return Ok(new ResponseFormat
      {
        Success = true,
        Message = "",
        Data = nguoiDung!.Id
        // Data = AuthUtilities.GenerateAuthToken(
        //   issuer: jwtSettings["Issuer"]!,
        //   audience: jwtSettings["Audience"]!,
        //   claims: claims,
        //   expires: DateTime.UtcNow.AddDays(1),
        //   jwt_key: jwtSettings["Key"]!
        // )
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Message = err.Message,
        Success = false
      });
    }
  }
}

public class LoginRequest
{
  public static async Task ValidateLoginRequest(AppDbContext dbContext, LoginRequest request)
  {
    TaiKhoanNguoiBan? nguoiDung = await dbContext.TaiKhoanNguoiBan.FirstOrDefaultAsync(i => i.Email == request.Email);

    if (nguoiDung == null)
    {
      throw new Exception("User not found!");
    }

    if (!AuthUtilities.VerifyPassword(request.MatKhau, nguoiDung.MatKhauBam!, nguoiDung.Salt!))
    {
      throw new Exception("Invalid request");
    }
  }

  public required string Email { get; set; }
  public required string MatKhau { get; set; }
}

public class RegisterRequest
{
  public static async Task ValidateRegisterRequest(AppDbContext dbContext, RegisterRequest request)
  {
    if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.MatKhau))
    {
      throw new Exception("Invalid input");
    }

    if (await dbContext.TaiKhoanNguoiBan.FirstOrDefaultAsync(i => i.Email == request.Email) != null)
    {
      throw new Exception("Email is existed.");
    }
  }

  public string? HoTen { get; set; }
  public string? SoDienThoai { get; set; }
  public string? Email { get; set; }
  public string? MatKhau { get; set; }
}