using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class DonHangKhachHang
{
  [Key]
  public string? Id { get; set; }
  public string? KhachHangId { get; set; }

  public int PhiVanChuyen { get; set; }
  public LoaiHinhThanhToan LoaiHinhThanhToan { get; set; }
  public DateTime NgayTao { get; set; }

  public TaiKhoanKhachHang? KhachHang { get; set; }
  public List<CapNhatTrangThaiDonHang>? TrangThaiDonHang { get; set; }
  public List<SanPhamDonHang>? SanPhamDonHang { get; set; }
}

public class CapNhatTrangThaiDonHang
{
  [Key]
  public string? Id { get; set; }
  public string? DonHangId { get; set; }

  public string? NoiDungCapNhat { get; set; }
  public TrangThaiDonHang TrangThaiDonHang { get; set; }
  public DateTime ThoiGianTao { get; set; }

  public DonHangKhachHang? DonHang { get; set; }
}

public class SanPhamDonHang
{
  [Key]
  public string? Id { get; set; }
  public string? PhienBanSanPhamId { get; set; }
  public string? DonHangId { get; set; }

  public uint SoLuong { get; set; }

  public PhienBanSanPham? PhienBanSanPham { get; set; }
  public DonHangKhachHang? DonHangKhachHang { get; set; }
}

public enum TrangThaiDonHang
{
  KHACH_HANG_DAT_HANG,
  NGUOI_BAN_XAC_NHAN,
  DON_HANG_VAN_CHUYEN,
  DON_HANG_GIAO_THAT_BAI,
  DON_HANG_GIAO_THANH_CONG,
  HUY_DON_HANG
}

public enum LoaiHinhThanhToan
{
  VN_PAY,
  KHI_NHAN_HANG,
  DANG_CHO
}