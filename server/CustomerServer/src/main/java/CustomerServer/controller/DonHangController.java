package CustomerServer.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import CustomerServer.dto.donhang.LoaiHinhThanhToan;
import CustomerServer.dto.donhang.SanPhamDonHang;
import CustomerServer.dto.donhang.TaoDonHangRequest;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/donhang")
@AllArgsConstructor
public class DonHangController {
  private final JdbcTemplate jdbcTemplate;

  @GetMapping("phuongthucthanhtoan")
  public ResponseEntity<?> XemDanhSachPhuongThucThanhToan() {
    return ResponseEntity.ok(ResponseFormat.success(LoaiHinhThanhToan.values()));
  }

  @GetMapping
  public ResponseEntity<?> XemDanhSachDonHang() {
    String sql = """
        SELECT
          dhkh.*,
          spdh."Id" PhienBanSanPhamId,
          spdh."SoLuong",
          pbsp."TenSanPham",
          pbsp."GiaBan",
          gh."Id",
          gh."TenGianHang",
          (
            SELECT
              "Url"
            FROM "MediaSanPham" media
            WHERE
              media."SanPhamId" = sp."Id"
              -- AND media."NgayTao" < CURRENT_DATE
              AND media."LoaiHinhAnhSanPham" = 0
            ORDER BY media."NgayTao" DESC
            LIMIT 1
          )"Url"
        FROM "DonHangKhachHang" dhkh
        LEFT JOIN "SanPhamDonHang" spdh ON spdh."DonHangId" = dhkh."Id"
        INNER JOIN "PhienBanSanPham" pbsp ON pbsp."Id" = spdh."PhienBanSanPhamId"
        INNER JOIN "SanPham" sp ON sp."Id" = pbsp."SanPhamId"
        INNER JOIN "TaiKhoanNguoiBan" nb ON nb."Id" = sp."NguoiBanId"
        INNER JOIN "GianHang" gh ON gh."NguoiBanId" = nb."Id"
        ORDER BY dhkh."NgayTao" DESC, nb."Id"
        """;

    List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
    return ResponseEntity.ok(ResponseFormat.success(data));
  }

  @GetMapping("{id}")
  public String XemThongTinDonHang(@PathVariable String id) {
    return new String();
  }

  @PostMapping
  public ResponseEntity<?> TaoDonHang(@RequestBody TaoDonHangRequest entity) {
    // TODO: process POST request
    // tao don hang
    String sqlTaoDonHAng = """
        INSERT INTO "DonHangKhachHang"
        ("Id", "KhachHangId", "PhiVanChuyen", "LoaiHinhThanhToan", "NgayTao")
        VALUES (?, ?, ?, ?, ?)
        """;
    String donHangId = UUID.randomUUID().toString();
    jdbcTemplate.update(
        sqlTaoDonHAng,
        donHangId,
        entity.getKhachHangId(),
        15_000,
        entity.getLoaiHinhThanhToan().ordinal(),
        new Date());

    // cap nhat trang thai
    String sqlCapNhatTrangThaiDonHang = """
        INSERT INTO "CapNhatTrangThaiDonHang"
        ("Id", "DonHangId", "NoiDungCapNhat", "TrangThaiDonHang", "ThoiGianTao")
        VALUES (?, ?, ?, 0, CURRENT_DATE)
        """;
    String trangThaiDonHangId = UUID.randomUUID().toString();
    jdbcTemplate.update(
        sqlCapNhatTrangThaiDonHang,
        trangThaiDonHangId,
        donHangId,
        "");

    // cap nhat san pham don hang
    var danhSachSanPham = entity.getSanPham();
    String sqlCapNhatSanPhamDonHang = """
        INSERT INTO "SanPhamDonHang"
        ("Id", "PhienBanSanPhamId", "DonHangId", "SoLuong")
        VALUES (?, ?, ? ,?)
        """;
    for (int i = 0; i < danhSachSanPham.size(); i++) {
      SanPhamDonHang item = danhSachSanPham.get(i);
      jdbcTemplate.update(
          sqlCapNhatSanPhamDonHang,
          UUID.randomUUID().toString(),
          item.getPhienBanSanPhamId(),
          donHangId,
          item.getSoLuong());
    }

    return ResponseEntity.ok(ResponseFormat.success(entity));
  }

  @DeleteMapping("{id}")
  public String HuyDonHang(@PathVariable String id, @RequestBody String entity) {
    // TODO: process PUT request

    return entity;
  }
}
