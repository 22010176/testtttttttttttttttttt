using DatabaseModels.Models;
using Microsoft.EntityFrameworkCore;

namespace DatabaseModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<TaiKhoanNguoiBan> TaiKhoanNguoiBan { get; set; }
  public DbSet<TaiKhoanKhachHang> TaiKhoanKhachHang { get; set; }
  public DbSet<SanPham> SanPham { get; set; }
  public DbSet<PhienBanSanPham> PhienBanSanPham { get; set; }
  public DbSet<MediaSanPham> MediaSanPham { get; set; }
  public DbSet<NganhHang> NganhHang { get; set; }
  public DbSet<DiaChiGiaoHang> DiaChiGiaoHang { get; set; }
  public DbSet<GioHangKhachHang> GioHangKhachHang { get; set; }
  public DbSet<GianHang> GianHang { get; set; }
  public DbSet<DonHangKhachHang> DonHangKhachHang { get; set; }
  public DbSet<CapNhatTrangThaiDonHang> CapNhatTrangThaiDonHang { get; set; }
  public DbSet<SanPhamDonHang> SanPhamDonHang { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    var donHangKhachHang = modelBuilder.Entity<DonHangKhachHang>();
    var capNhatTrangThaiDonHang = modelBuilder.Entity<CapNhatTrangThaiDonHang>();
    var sanPhamDonHang = modelBuilder.Entity<SanPhamDonHang>();
    var gianHang = modelBuilder.Entity<GianHang>();
    var gioHangKhachHang = modelBuilder.Entity<GioHangKhachHang>();
    var nguoiBan = modelBuilder.Entity<TaiKhoanNguoiBan>();
    var DiaChiGiaoHang = modelBuilder.Entity<DiaChiGiaoHang>();
    var khachHang = modelBuilder.Entity<TaiKhoanKhachHang>();
    var sanPham = modelBuilder.Entity<SanPham>();
    var phienBanSanPham = modelBuilder.Entity<PhienBanSanPham>();
    var mediaSanPham = modelBuilder.Entity<MediaSanPham>();
    var nganhHang = modelBuilder.Entity<NganhHang>();

    donHangKhachHang
      .HasOne(i => i.KhachHang)
      .WithMany(i => i.DonHangKhachHang)
      .HasForeignKey(i => i.KhachHangId);

    capNhatTrangThaiDonHang
      .HasOne(i => i.DonHang)
      .WithMany(i => i.TrangThaiDonHang)
      .HasForeignKey(i => i.DonHangId);

    sanPhamDonHang
      .HasOne(i => i.PhienBanSanPham)
      .WithMany(i => i.SanPhamDonHang)
      .HasForeignKey(i => i.PhienBanSanPhamId);

    sanPhamDonHang
      .HasOne(i => i.DonHangKhachHang)
      .WithMany(i => i.SanPhamDonHang)
      .HasForeignKey(i => i.DonHangId);

    sanPham
      .HasOne(sanPham => sanPham.NguoiBan)
      .WithMany(nguoiBan => nguoiBan.SanPham)
      .HasForeignKey(i => i.NguoiBanId);

    nganhHang
      .HasOne(i => i.NganhHangCha)
      .WithMany(i => i.NganhHangCon)
      .HasForeignKey(i => i.NganhHangChaId);

    phienBanSanPham
      .HasOne(i => i.SanPham)
      .WithMany(i => i.PhienBanSanPham)
      .HasForeignKey(i => i.SanPhamId);

    phienBanSanPham
      .HasOne(i => i.NganhHang)
      .WithMany(i => i.PhienBanSanPham)
      .HasForeignKey(i => i.NganhHangId);

    mediaSanPham
      .HasOne(i => i.PhienBanSanPham)
      .WithMany(i => i.MediaSanPham)
      .HasForeignKey(i => i.PhienBanSanPhamId);

    DiaChiGiaoHang
      .HasOne(i => i.TaiKhoanKhachHang)
      .WithMany(i => i.DiaChiGiaoHang)
      .HasForeignKey(i => i.TaiKhoanKhachHangId);

    gioHangKhachHang
      .HasOne(i => i.SanPham)
      .WithMany(i => i.GioHangKhachHang)
      .HasForeignKey(i => i.SanPhamId);

    gioHangKhachHang
      .HasOne(i => i.TaiKhoanKhachHang)
      .WithMany(i => i.GioHangKhachHang)
      .HasForeignKey(i => i.KhachHangId);

    gianHang
      .HasOne(i => i.TaiKhoanNguoiBan)
      .WithMany(i => i.GianHang)
      .HasForeignKey(i => i.NguoiBanId);
  }
}
