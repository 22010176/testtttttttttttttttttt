using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Utilities.Aws;

namespace SellerServer.Controllers;

[ApiController]
[Route("api/thanh-toan")]
public class PaymentController(IConfiguration configuration, AwsSecret secrets) : ControllerBase
{
  readonly IConfiguration _config = configuration;
  readonly AwsSecret secrets = secrets;

  [HttpPost]
  public IActionResult GetUrl()
  {
    var request = HttpContext.Request;

    string vnp_HashSecret = secrets.VNPAY.HashSecret!;
    string vnp_TmnCode = secrets.VNPAY.TmnCode!;
    string vnp_Url = secrets.VNPAY.Url!;
    string vnp_ReturnUrl = $"{request.Scheme}://{request.Host}/{secrets.VNPAY.ReturnUrl!}";

    VNP_Params _params = new()
    {
      vnp_Amount = $"{1000000 * 100}",
      vnp_Command = "pay",
      vnp_CreateDate = DateTime.Now.ToString("yyyyMMddHHmmss"),
      vnp_CurrCode = "VND",
      vnp_IpAddr = HttpContext.Connection.RemoteIpAddress!.ToString(),
      vnp_Locale = "vn",
      vnp_OrderInfo = "Thanh+toan+cho+ma+GD",
      vnp_OrderType = "other",
      vnp_ReturnUrl = vnp_ReturnUrl,
      vnp_TmnCode = vnp_TmnCode,
      vnp_TxnRef = Guid.NewGuid().ToString(),
      vnp_Version = "2.1.0"
    };
    _params.vnp_SecureHash = VNP_Params.CalcHashSecret(_params, vnp_HashSecret);
    return Ok(new
    {
      url = $"{vnp_Url}?{_params.ToQueryString(true)}",
      _url = _params
    });
  }

  [HttpGet("return")]
  public IActionResult Return()
  {
    try
    {
      var request = HttpContext.Request;

      string vnp_HashSecret = _config["VNPAY:VNP_HashSecret"]!;
      string vnp_TmnCode = _config["VNPAY:VNP_TmnCode"]!;
      string vnp_Url = _config["VNPAY:VNP_Url"]!;
      string vnp_ReturnUrl = $"{request.Scheme}://{request.Host}/{_config["VNPAY:vnp_ReturnUrl"]!}";

      var query = request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
      VNP_Params _Params = VNP_Params.GetVNP_Params(query);

      string hash = VNP_Params.CalcHashSecret(_Params, vnp_HashSecret);
      return Ok(new
      {
        code = hash == _Params.vnp_SecureHash ? _Params.vnp_ResponseCode : "97"
      });
    }
    catch (Exception)
    {
      throw;
    }
  }

  [HttpGet("ipn")]
  public IActionResult IPN()
  {
    var request = HttpContext.Request;

    string vnp_HashSecret = _config["VNPAY:VNP_HashSecret"]!;
    string vnp_TmnCode = _config["VNPAY:VNP_TmnCode"]!;
    string vnp_Url = _config["VNPAY:VNP_Url"]!;
    string vnp_ReturnUrl = $"{request.Scheme}://{request.Host}/{_config["VNPAY:vnp_ReturnUrl"]!}";

    var query = request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
    VNP_Params _Params = VNP_Params.GetVNP_Params(query);
    string hash = VNP_Params.CalcHashSecret(_Params, vnp_HashSecret);

    //kiểm tra checksum
    if (_Params.vnp_SecureHash != hash) return Ok(new { RspCode = "97", Message = "Checksum failed" });

    // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    bool hasOrder = true;
    if (!hasOrder) return Ok(new { RspCode = "01", Message = "Order not found" });

    // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    bool isAmountValid = false;
    if (!isAmountValid) return Ok(new { RspCode = "04", Message = "Amount invalid" });

    char paymentStatus = '0';
    return paymentStatus switch
    {
      // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
      '0' => Ok(_Params.vnp_ResponseCode == "00" // ''
                ? new { RspCode = "00", Message = "Success" }
                : new { RspCode = "00", Message = "Success" }),

      // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
      // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
      '1' or '2' => Ok(new
      {
        RspCode = "04",
        Message = "This order has been updated to the payment status"
      }),
      _ => Ok(new { query, hash }),
    };
  }
}

public class VNP_Params
{
  public static string CalcHashSecret(VNP_Params _Params, string secret)
  {
    var keyBytes = Encoding.UTF8.GetBytes(secret);
    var dataBytes = Encoding.UTF8.GetBytes(_Params.ToQueryString());

    using var hmac = new HMACSHA512(keyBytes);
    var hashBytes = hmac.ComputeHash(dataBytes);

    var sb = new StringBuilder();
    foreach (var b in hashBytes) sb.Append(b.ToString("x2"));

    return sb.ToString();
  }

  public static VNP_Params GetVNP_Params(Dictionary<string, string> dict)
  {
    return new()
    {
      vnp_Amount = dict.GetValueOrDefault("vnp_Amount"),
      vnp_BankCode = dict.GetValueOrDefault("vnp_BankCode"),
      vnp_CardType = dict.GetValueOrDefault("vnp_CardType"),
      vnp_Command = dict.GetValueOrDefault("vnp_Command"),
      vnp_CreateDate = dict.GetValueOrDefault("vnp_CreateDate"),
      vnp_CurrCode = dict.GetValueOrDefault("vnp_CurrCode"),
      vnp_IpAddr = dict.GetValueOrDefault("vnp_IpAddr"),
      vnp_Locale = dict.GetValueOrDefault("vnp_Locale"),
      vnp_OrderInfo = dict.GetValueOrDefault("vnp_OrderInfo"),
      vnp_OrderType = dict.GetValueOrDefault("vnp_OrderType"),
      vnp_ReturnUrl = dict.GetValueOrDefault("vnp_ReturnUrl"),
      vnp_TmnCode = dict.GetValueOrDefault("vnp_TmnCode"),
      vnp_TxnRef = dict.GetValueOrDefault("vnp_TxnRef"),
      vnp_Version = dict.GetValueOrDefault("vnp_Version"),
      vnp_SecureHash = dict.GetValueOrDefault("vnp_SecureHash"),
      vnp_PayDate = dict.GetValueOrDefault("vnp_PayDate"),
      vnp_ResponseCode = dict.GetValueOrDefault("vnp_ResponseCode"),
      vnp_TransactionNo = dict.GetValueOrDefault("vnp_TransactionNo"),
      vnp_TransactionStatus = dict.GetValueOrDefault("vnp_TransactionStatus"),
    };
  }

  public string? vnp_Amount;
  public string? vnp_BankCode;
  public string? vnp_CardType;
  public string? vnp_Command;
  public string? vnp_CreateDate;
  public string? vnp_CurrCode;
  public string? vnp_IpAddr;
  public string? vnp_Locale;
  public string? vnp_OrderInfo;
  public string? vnp_OrderType;
  public string? vnp_ReturnUrl;
  public string? vnp_TmnCode;
  public string? vnp_TxnRef;
  public string? vnp_Version;
  public string? vnp_SecureHash;

  public string? vnp_PayDate;
  public string? vnp_ResponseCode;

  public string? vnp_TransactionNo;
  public string? vnp_TransactionStatus;

  public string ToQueryString(bool includeHash = false)
  {
    var props = GetType().GetFields(BindingFlags.Public | BindingFlags.Instance);

    // Sort keys alphabetically (VNPay spec!)
    var ordered = props
      .Where(p => p.Name != "vnp_SecureHash" || includeHash)
      .Select(p => new { p.Name, Value = p.GetValue(this) })
      .Where(x => x.Value != null) // ignore null
      .OrderBy(x => x.Name, StringComparer.Ordinal);

    var sb = new StringBuilder();
    foreach (var kv in ordered)
    {
      if (sb.Length > 0) sb.Append('&');
      sb.Append($"{kv.Name}={WebUtility.UrlEncode(kv.Value!.ToString())}");
    }

    return sb.ToString();
  }
}