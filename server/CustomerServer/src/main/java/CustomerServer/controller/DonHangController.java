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
import org.springframework.web.bind.annotation.RestController;

import CustomerServer.dto.ResponseFormat;
import CustomerServer.dto.donhang.LoaiHinhThanhToan;
import CustomerServer.dto.donhang.SanPhamDonHang;
import CustomerServer.dto.donhang.TaoDonHangRequest;
import CustomerServer.dto.donhang.TrangThaiDonHang;
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

  @GetMapping("duyetdonhang")
  public ResponseEntity<?> XemThongTinDonHangCanDuyet(String khachHangId) {
    String sql = """
        SELECT
        	sp."Id" "SanPhamId",
        	sp."Id" "PhienBanSanPhamId",
        	sp."TenSanPham",
        	sp."GiaBan",
        	sp."GianHangId",
        	sp."TenGianHang",
        	spdh."SoLuong",
        	sp."Url"
        FROM "DonHangKhachHang" dhkh
        INNER JOIN "SanPhamDonHang" spdh ON spdh."DonHangId" = dhkh."Id"
        JOIN LATERAL (
        	SELECT
        		pbsp.*,
        		sp."NguoiBanId",
        		gh."Id" "GianHangId",
        		gh."TenGianHang",
        		media."Url"
        	FROM "PhienBanSanPham" pbsp
        	INNER JOIN "SanPham" sp ON sp."Id" = pbsp."SanPhamId"
        	INNER JOIN "GianHang" gh ON gh."NguoiBanId" = sp."NguoiBanId"
        	INNER JOIN "MediaSanPham" media ON media."SanPhamId" = pbsp."SanPhamId"
        	WHERE
        		media."LoaiHinhAnhSanPham" = 0 AND
        		pbsp."Id" = spdh."PhienBanSanPhamId"
        	ORDER BY media."NgayTao" DESC
        	LIMIT 1
        ) sp ON TRUE
        WHERE
        	dhkh."KhachHangId" = ? AND
        	dhkh."LoaiHinhThanhToan" = 2
        ORDER BY dhkh."Id", spdh."SoLuong" DESC;
        """;
    List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, khachHangId);
    return ResponseEntity.ok(ResponseFormat.success(result));
  }

  @GetMapping
  public ResponseEntity<?> XemDanhSachDonHang(String khachHangId) {
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
        WHERE
          dhkh."KhachHangId" = ?
          AND NOT dhkh."LoaiHinhThanhToan" = 2
        ORDER BY dhkh."NgayTao" DESC, nb."Id"
        """;

    List<Map<String, Object>> data = jdbcTemplate.queryForList(sql, khachHangId);
    return ResponseEntity.ok(ResponseFormat.success(data));
  }

  @GetMapping("{donHangId}")
  public ResponseEntity<?> XemThongTinDonHang(@PathVariable String donHangId) {
    String sqlLayThongTinDonHang = """
        SELECT
        	dhkh.*,
        	tkkh."SoDienThoai",
        	dc."HoTen",
        	dc."SoDienThoai",
        	dc."DiaChiCuThe"
        FROM "DonHangKhachHang" dhkh
        INNER JOIN "TaiKhoanKhachHang" tkkh ON tkkh."Id" = dhkh."KhachHangId"
        JOIN LATERAL (
        	SELECT *
        	FROM "DiaChiGiaoHang" dcgh
        ) dc ON dc."TaiKhoanKhachHangId" = tkkh."Id"
        WHERE dhkh."Id" = ?
        ORDER BY "NgayTao" DESC
        LIMIT 1
        """;
    Map<String, Object> donHang = jdbcTemplate.queryForMap(sqlLayThongTinDonHang, donHangId);

    String sqlXemThongTinTrangThaiDonHang = """
        SELECT
        	cntt.*
        FROM "DonHangKhachHang" dhkh
        INNER JOIN "CapNhatTrangThaiDonHang" cntt ON cntt."DonHangId" = dhkh."Id"
        WHERE dhkh."Id" = ?
        ORDER BY cntt."ThoiGianTao" DESC
        """;
    List<Map<String, Object>> trangThai = jdbcTemplate.queryForList(sqlXemThongTinTrangThaiDonHang, donHangId);

    String sqlXemDanhSachSanPham = """
        SELECT
        	pbsp."SanPhamId",
        	pbsp."Id" "PhienBanId",
        	pbsp."TenSanPham",
        	pbsp."GiaBan",
        	spdh."SoLuong",
        	sp."NguoiBanId",
        	media."Url"
        FROM "DonHangKhachHang" dhkh
        INNER JOIN "SanPhamDonHang" spdh ON spdh."DonHangId" = dhkh."Id"
        INNER JOIN "PhienBanSanPham" pbsp ON pbsp."Id" = spdh."PhienBanSanPhamId"
        INNER JOIN "SanPham" sp ON sp."Id" = pbsp."SanPhamId"
        INNER JOIN "TaiKhoanNguoiBan" nb ON nb."Id" = sp."NguoiBanId"
        JOIN LATERAL (
        	SELECT "Url"
        	FROM "MediaSanPham"
        	WHERE
        		"SanPhamId" = pbsp."SanPhamId"
        		AND "LoaiHinhAnhSanPham" = 0
        	ORDER BY "NgayTao"
        	LIMIT 1
        ) media ON TRUE
        WHERE dhkh."Id" = ?
        """;
    List<Map<String, Object>> sanPham = jdbcTemplate.queryForList(sqlXemDanhSachSanPham, donHangId);
    donHang.put("trangThai", trangThai);
    donHang.put("sanPham", sanPham);

    return ResponseEntity.ok(ResponseFormat.success(donHang));
  }

  @PostMapping("duyetdonhang")
  public ResponseEntity<?> DuyetDonHang(String khachHangId) {
    List<Map<String, Object>> donHang = jdbcTemplate.queryForList("""
        SELECT
        	"Id"
        FROM "DonHangKhachHang" dhkh
        WHERE
        	dhkh."LoaiHinhThanhToan" = 2 AND
        	dhkh."KhachHangId" = ?
          """, khachHangId);

    String query = """
        UPDATE "DonHangKhachHang"
        	SET "LoaiHinhThanhToan"=?
        	WHERE "Id"=?;
          """;
    for (Map<String, Object> elem : donHang) {
      System.out.println(elem);
      jdbcTemplate.update(query, LoaiHinhThanhToan.KHI_NHAN_HANG.ordinal(), elem.get("Id").toString());
    }

    return ResponseEntity.ok(ResponseFormat.success(donHang));
  }

  @PostMapping
  public ResponseEntity<?> TaoDonHang(@RequestBody TaoDonHangRequest entity) {
    // TODO: process POST request
    // tao don hang
    // entity.setKhachHangId("khachHangId");
    var danhSachSanPham = entity.getSanPham()
        .stream()
        .filter((SanPhamDonHang i) -> i.getSoLuong() > 0)
        .toList();
    if (danhSachSanPham.isEmpty()) {
      throw new Error("yeu cau loi");
    }

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
    // var danhSachSanPham = entity.getSanPham();
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

  @DeleteMapping("duyetdonhang")
  public ResponseEntity<?> HuyDuyet(String khachHangId) {
    List<Map<String, Object>> sanPhamDonHangCanDuyet = jdbcTemplate.queryForList("""
        SELECT
        	spdh."Id" "SanPhamDonHangId",
        	dhkh."Id" "DonHangId"
        FROM "SanPhamDonHang" spdh
        INNER JOIN "DonHangKhachHang" dhkh ON dhkh."Id" = spdh."DonHangId"
        WHERE
        	dhkh."LoaiHinhThanhToan" = 2 AND
        	dhkh."KhachHangId" = ?;
          """, khachHangId);
    List<Map<String, Object>> trangThai = jdbcTemplate.queryForList("""
        SELECT
        	cn."Id" "TrangThaiId"
        FROM "CapNhatTrangThaiDonHang" cn
        INNER JOIN "DonHangKhachHang" dhkh ON dhkh."Id" = cn."DonHangId"
        WHERE
        	dhkh."LoaiHinhThanhToan" = 2 AND
        	dhkh."KhachHangId" = ?
          """, khachHangId);
    List<Map<String, Object>> donHang = jdbcTemplate.queryForList("""
        SELECT
        	"Id"
        FROM "DonHangKhachHang" dhkh
        WHERE
        	dhkh."LoaiHinhThanhToan" = 2 AND
        	dhkh."KhachHangId" = ?
                  """, khachHangId);

    for (Map<String, Object> elem : sanPhamDonHangCanDuyet) {
      String _id = (String) elem.get("SanPhamDonHangId");

      jdbcTemplate.update("DELETE FROM \"SanPhamDonHang\" WHERE \"Id\" = ?;", _id);
    }
    for (Map<String, Object> elem : trangThai) {
      String _id = (String) elem.get("TrangThaiId");
      jdbcTemplate.update("DELETE FROM \"CapNhatTrangThaiDonHang\" WHERE \"Id\" = ?;", _id);
    }
    for (Map<String, Object> elem : donHang) {
      String _id = (String) elem.get("Id");
      jdbcTemplate.update("DELETE FROM \"DonHangKhachHang\" WHERE \"Id\" = ?;", _id);
    }

    return ResponseEntity.ok(ResponseFormat.success(Map.of(
        "sanPhamDonHangCanDuyet", sanPhamDonHangCanDuyet,
        "trangThai", trangThai,
        "donHang", donHang)));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> HuyDonHang(@PathVariable String id) {
    // TODO: process PUT request
    String sqlHuyDonHang = """
        INSERT INTO "CapNhatTrangThaiDonHang"
        	("Id", "DonHangId", "NoiDungCapNhat", "TrangThaiDonHang", "ThoiGianTao")
        VALUES (?, ?, ?, ?, CURRENT_DATE)
        """;
    jdbcTemplate.update(sqlHuyDonHang,
        UUID.randomUUID().toString(),
        id,
        "Huy Don Hang",
        TrangThaiDonHang.HUY_DON_HANG.ordinal());
    return ResponseEntity.ok(ResponseFormat.success());
  }
}
