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

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    var nguoiBan = modelBuilder.Entity<TaiKhoanNguoiBan>();
    var DiaChiGiaoHang = modelBuilder.Entity<DiaChiGiaoHang>();
    var khachHang = modelBuilder.Entity<TaiKhoanKhachHang>();
    var sanPham = modelBuilder.Entity<SanPham>();
    var phienBanSanPham = modelBuilder.Entity<PhienBanSanPham>();
    var mediaSanPham = modelBuilder.Entity<MediaSanPham>();
    var nganhHang = modelBuilder.Entity<NganhHang>();

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
  }
}
