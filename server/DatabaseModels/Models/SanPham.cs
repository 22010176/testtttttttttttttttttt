using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public enum TrangThaiSanPham
{
  HOAT_DONG,
  BAN_NHAP,
  NGUNG_HOAT_DONG,
  BI_XOA
}
public class SanPham
{
  [Key]
  public int Id { get; set; }
  public int? NguoiBanId { get; set; }

  public TrangThaiSanPham TrangThaiSanPham { get; set; } = TrangThaiSanPham.BAN_NHAP;

  public TaiKhoanNguoiBan? NguoiBan { get; set; }
  public List<PhienBanSanPham>? PhienBanSanPham { get; set; }
  public List<MediaSanPham>? MediaSanPham { get; set; }
}

public class PhienBanSanPham
{
  [Key]
  public int Id { get; set; }
  public int? NganhHangId { get; set; }
  public int? SanPhamId { get; set; }

  public string? TenSanPham { get; set; }
  public string? MoTaSanPham { get; set; }
  public double? GiaBan { get; set; }
  public DateTime NgayTao { get; set; }

  public NganhHang? NganhHang { get; set; }
  public SanPham? SanPham { get; set; }
  public List<MediaSanPham>? MediaSanPham { get; set; }
}

public class MediaSanPham
{
  [Key]
  public int Id { get; set; }
  public int PhienBanSanPhamId { get; set; }

  public int SoThuTu { get; set; }
  public LoaiHinhAnhSanPham LoaiHinhAnhSanPham { get; set; }
  public string? Url { get; set; }
  public DateTime NgayTao { get; set; }

  public PhienBanSanPham? PhienBanSanPham { get; set; }
}

public enum LoaiHinhAnhSanPham
{
  HINH_MINH_HOA,
  HINH_ANH_BIA,
  VIDEO_SAN_PHAM
}

public class NganhHang
{
  [Key]
  public int Id { get; set; }
  public int? NganhHangChaId { get; set; }

  public string? TenNganhHang { get; set; }
  public bool LaNhanh { get; set; } = false;

  public NganhHang? NganhHangCha { get; set; }
  public List<NganhHang>? NganhHangCon { get; set; }
  public List<PhienBanSanPham>? PhienBanSanPham { get; set; }
}

