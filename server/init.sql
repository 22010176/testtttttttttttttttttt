CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;
CREATE TABLE "NganhHang" (
    "Id" text NOT NULL,
    "NganhHangChaId" text,
    "TenNganhHang" text,
    "LaNhanh" boolean NOT NULL,
    CONSTRAINT "PK_NganhHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_NganhHang_NganhHang_NganhHangChaId" FOREIGN KEY ("NganhHangChaId") REFERENCES "NganhHang" ("Id")
);

CREATE TABLE "TaiKhoanKhachHang" (
    "Id" text NOT NULL,
    "HoTen" text,
    "Email" text,
    "SoDienThoai" text,
    "MatKhauBam" text,
    "Salt" text,
    "GioiTinh" integer,
    "SinhNhat" timestamp with time zone NOT NULL,
    "NgayTao" timestamp with time zone,
    CONSTRAINT "PK_TaiKhoanKhachHang" PRIMARY KEY ("Id")
);

CREATE TABLE "TaiKhoanNguoiBan" (
    "Id" text NOT NULL,
    "HoTen" text,
    "Email" text,
    "SoDienThoai" text,
    "MatKhauBam" text,
    "Salt" text,
    "GioiTinh" integer,
    "SinhNhat" timestamp with time zone NOT NULL,
    "NgayTao" timestamp with time zone,
    CONSTRAINT "PK_TaiKhoanNguoiBan" PRIMARY KEY ("Id")
);

CREATE TABLE "DiaChiGiaoHang" (
    "Id" text NOT NULL,
    "TaiKhoanKhachHangId" text,
    "HoTen" text,
    "SoDienThoai" text,
    "DiaChiCuThe" text,
    CONSTRAINT "PK_DiaChiGiaoHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_DiaChiGiaoHang_TaiKhoanKhachHang_TaiKhoanKhachHangId" FOREIGN KEY ("TaiKhoanKhachHangId") REFERENCES "TaiKhoanKhachHang" ("Id")
);

CREATE TABLE "DonHangKhachHang" (
    "Id" text NOT NULL,
    "KhachHangId" text,
    "PhiVanChuyen" integer NOT NULL,
    "LoaiHinhThanhToan" integer NOT NULL,
    "NgayTao" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_DonHangKhachHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_DonHangKhachHang_TaiKhoanKhachHang_KhachHangId" FOREIGN KEY ("KhachHangId") REFERENCES "TaiKhoanKhachHang" ("Id")
);

CREATE TABLE "GianHang" (
    "Id" text NOT NULL,
    "NguoiBanId" text,
    "TenGianHang" text,
    "MoTaShop" text,
    "HinhAnhDaiDien" text,
    CONSTRAINT "PK_GianHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GianHang_TaiKhoanNguoiBan_NguoiBanId" FOREIGN KEY ("NguoiBanId") REFERENCES "TaiKhoanNguoiBan" ("Id")
);

CREATE TABLE "SanPham" (
    "Id" text NOT NULL,
    "NguoiBanId" text,
    "TrangThaiSanPham" integer NOT NULL,
    CONSTRAINT "PK_SanPham" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SanPham_TaiKhoanNguoiBan_NguoiBanId" FOREIGN KEY ("NguoiBanId") REFERENCES "TaiKhoanNguoiBan" ("Id")
);

CREATE TABLE "CapNhatTrangThaiDonHang" (
    "Id" text NOT NULL,
    "DonHangId" text,
    "NoiDungCapNhat" text,
    "TrangThaiDonHang" integer NOT NULL,
    "ThoiGianTao" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_CapNhatTrangThaiDonHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_CapNhatTrangThaiDonHang_DonHangKhachHang_DonHangId" FOREIGN KEY ("DonHangId") REFERENCES "DonHangKhachHang" ("Id")
);

CREATE TABLE "GioHangKhachHang" (
    "Id" text NOT NULL,
    "SanPhamId" text,
    "KhachHangId" text,
    "SoLuong" bigint NOT NULL,
    CONSTRAINT "PK_GioHangKhachHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GioHangKhachHang_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES "SanPham" ("Id"),
    CONSTRAINT "FK_GioHangKhachHang_TaiKhoanKhachHang_KhachHangId" FOREIGN KEY ("KhachHangId") REFERENCES "TaiKhoanKhachHang" ("Id")
);

CREATE TABLE "MediaSanPham" (
    "Id" text NOT NULL,
    "SanPhamId" text,
    "LoaiHinhAnhSanPham" integer NOT NULL,
    "Url" text,
    "NgayTao" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_MediaSanPham" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_MediaSanPham_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES "SanPham" ("Id")
);

CREATE TABLE "PhienBanSanPham" (
    "Id" text NOT NULL,
    "NganhHangId" text,
    "SanPhamId" text,
    "TenSanPham" text,
    "MoTaSanPham" text,
    "GiaBan" double precision,
    "NgayTao" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_PhienBanSanPham" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PhienBanSanPham_NganhHang_NganhHangId" FOREIGN KEY ("NganhHangId") REFERENCES "NganhHang" ("Id"),
    CONSTRAINT "FK_PhienBanSanPham_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES "SanPham" ("Id")
);

CREATE TABLE "SanPhamDonHang" (
    "Id" text NOT NULL,
    "PhienBanSanPhamId" text,
    "DonHangId" text,
    "SoLuong" bigint NOT NULL,
    CONSTRAINT "PK_SanPhamDonHang" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_SanPhamDonHang_DonHangKhachHang_DonHangId" FOREIGN KEY ("DonHangId") REFERENCES "DonHangKhachHang" ("Id"),
    CONSTRAINT "FK_SanPhamDonHang_PhienBanSanPham_PhienBanSanPhamId" FOREIGN KEY ("PhienBanSanPhamId") REFERENCES "PhienBanSanPham" ("Id")
);

CREATE INDEX "IX_CapNhatTrangThaiDonHang_DonHangId" ON "CapNhatTrangThaiDonHang" ("DonHangId");

CREATE INDEX "IX_DiaChiGiaoHang_TaiKhoanKhachHangId" ON "DiaChiGiaoHang" ("TaiKhoanKhachHangId");

CREATE INDEX "IX_DonHangKhachHang_KhachHangId" ON "DonHangKhachHang" ("KhachHangId");

CREATE INDEX "IX_GianHang_NguoiBanId" ON "GianHang" ("NguoiBanId");

CREATE INDEX "IX_GioHangKhachHang_KhachHangId" ON "GioHangKhachHang" ("KhachHangId");

CREATE INDEX "IX_GioHangKhachHang_SanPhamId" ON "GioHangKhachHang" ("SanPhamId");

CREATE INDEX "IX_MediaSanPham_SanPhamId" ON "MediaSanPham" ("SanPhamId");

CREATE INDEX "IX_NganhHang_NganhHangChaId" ON "NganhHang" ("NganhHangChaId");

CREATE INDEX "IX_PhienBanSanPham_NganhHangId" ON "PhienBanSanPham" ("NganhHangId");

CREATE INDEX "IX_PhienBanSanPham_SanPhamId" ON "PhienBanSanPham" ("SanPhamId");

CREATE INDEX "IX_SanPham_NguoiBanId" ON "SanPham" ("NguoiBanId");

CREATE INDEX "IX_SanPhamDonHang_DonHangId" ON "SanPhamDonHang" ("DonHangId");

CREATE INDEX "IX_SanPhamDonHang_PhienBanSanPhamId" ON "SanPhamDonHang" ("PhienBanSanPhamId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20251114140915_Init', '9.0.9');

COMMIT;

