--
-- PostgreSQL database dump
--

\restrict kPeOgPoQAtAapkhmnqQrITurrzL7YeASmgTbXLvAbPQes1AiJlvVUGQpx8tUfar

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CapNhatTrangThaiDonHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CapNhatTrangThaiDonHang" (
    "Id" text NOT NULL,
    "DonHangId" text,
    "NoiDungCapNhat" text,
    "TrangThaiDonHang" integer NOT NULL,
    "ThoiGianTao" timestamp with time zone NOT NULL
);


ALTER TABLE public."CapNhatTrangThaiDonHang" OWNER TO postgres;

--
-- Name: DiaChiGiaoHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DiaChiGiaoHang" (
    "Id" text NOT NULL,
    "TaiKhoanKhachHangId" text,
    "HoTen" text,
    "SoDienThoai" text,
    "DiaChiCuThe" text
);


ALTER TABLE public."DiaChiGiaoHang" OWNER TO postgres;

--
-- Name: DonHangKhachHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DonHangKhachHang" (
    "Id" text NOT NULL,
    "KhachHangId" text,
    "PhiVanChuyen" integer NOT NULL,
    "LoaiHinhThanhToan" integer NOT NULL,
    "NgayTao" timestamp with time zone NOT NULL
);


ALTER TABLE public."DonHangKhachHang" OWNER TO postgres;

--
-- Name: GianHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GianHang" (
    "Id" text NOT NULL,
    "NguoiBanId" text,
    "TenGianHang" text,
    "MoTaShop" text,
    "HinhAnhDaiDien" text
);


ALTER TABLE public."GianHang" OWNER TO postgres;

--
-- Name: GioHangKhachHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GioHangKhachHang" (
    "Id" text NOT NULL,
    "SanPhamId" text,
    "KhachHangId" text,
    "SoLuong" bigint NOT NULL
);


ALTER TABLE public."GioHangKhachHang" OWNER TO postgres;

--
-- Name: MediaSanPham; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MediaSanPham" (
    "Id" text NOT NULL,
    "SanPhamId" text,
    "LoaiHinhAnhSanPham" integer NOT NULL,
    "Url" text,
    "NgayTao" timestamp with time zone NOT NULL
);


ALTER TABLE public."MediaSanPham" OWNER TO postgres;

--
-- Name: NganhHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NganhHang" (
    "Id" text NOT NULL,
    "NganhHangChaId" text,
    "TenNganhHang" text,
    "LaNhanh" boolean NOT NULL
);


ALTER TABLE public."NganhHang" OWNER TO postgres;

--
-- Name: PhienBanSanPham; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PhienBanSanPham" (
    "Id" text NOT NULL,
    "NganhHangId" text,
    "SanPhamId" text,
    "TenSanPham" text,
    "MoTaSanPham" text,
    "GiaBan" double precision,
    "NgayTao" timestamp with time zone NOT NULL
);


ALTER TABLE public."PhienBanSanPham" OWNER TO postgres;

--
-- Name: SanPham; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SanPham" (
    "Id" text NOT NULL,
    "NguoiBanId" text,
    "TrangThaiSanPham" integer NOT NULL
);


ALTER TABLE public."SanPham" OWNER TO postgres;

--
-- Name: SanPhamDonHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SanPhamDonHang" (
    "Id" text NOT NULL,
    "PhienBanSanPhamId" text,
    "DonHangId" text,
    "SoLuong" bigint NOT NULL
);


ALTER TABLE public."SanPhamDonHang" OWNER TO postgres;

--
-- Name: TaiKhoanKhachHang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaiKhoanKhachHang" (
    "Id" text NOT NULL,
    "HoTen" text,
    "Email" text,
    "SoDienThoai" text,
    "MatKhauBam" text,
    "Salt" text,
    "GioiTinh" integer,
    "SinhNhat" timestamp with time zone NOT NULL,
    "NgayTao" timestamp with time zone
);


ALTER TABLE public."TaiKhoanKhachHang" OWNER TO postgres;

--
-- Name: TaiKhoanNguoiBan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaiKhoanNguoiBan" (
    "Id" text NOT NULL,
    "HoTen" text,
    "Email" text,
    "SoDienThoai" text,
    "MatKhauBam" text,
    "Salt" text,
    "GioiTinh" integer,
    "SinhNhat" timestamp with time zone NOT NULL,
    "NgayTao" timestamp with time zone
);


ALTER TABLE public."TaiKhoanNguoiBan" OWNER TO postgres;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Data for Name: CapNhatTrangThaiDonHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: DiaChiGiaoHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: DonHangKhachHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: GianHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: GioHangKhachHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: MediaSanPham; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: NganhHang; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100017', NULL, 'Thời Trang Nữ', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100011', NULL, 'Thời Trang Nam', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100630', NULL, 'Sắc Đẹp', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100001', NULL, 'Sức Khỏe', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100009', NULL, 'Phụ Kiện Thời Trang', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100010', NULL, 'Thiết Bị Điện Gia Dụng', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100012', NULL, 'Giày Dép Nam', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100013', NULL, 'Điện Thoại & Phụ Kiện', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100015', NULL, 'Du lịch & Hành lý', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100016', NULL, 'Túi Ví Nữ', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100532', NULL, 'Giày Dép Nữ', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100533', NULL, 'Túi Ví Nam', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100534', NULL, 'Đồng Hồ', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100535', NULL, 'Thiết Bị Âm Thanh', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100629', NULL, 'Thực phẩm và đồ uống', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100631', NULL, 'Chăm Sóc Thú Cưng', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100632', NULL, 'Mẹ & Bé', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100633', NULL, 'Thời trang trẻ em & trẻ sơ sinh', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100634', NULL, 'Gaming & Console', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100635', NULL, 'Cameras & Flycam', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100636', NULL, 'Nhà cửa & Đời sống', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100637', NULL, 'Thể Thao & Dã Ngoại', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100638', NULL, 'Văn Phòng Phẩm', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100639', NULL, 'Sở thích & Sưu tầm', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100640', NULL, 'Ô tô', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100641', NULL, 'Mô tô, xe máy', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100643', NULL, 'Sách & Tạp Chí', false);
INSERT INTO public."NganhHang" ("Id", "NganhHangChaId", "TenNganhHang", "LaNhanh") VALUES ('100644', NULL, 'Máy tính & Laptop', false);


--
-- Data for Name: PhienBanSanPham; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SanPham; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SanPhamDonHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TaiKhoanKhachHang; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TaiKhoanNguoiBan; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") VALUES ('20251118161343_Init', '9.0.9');


--
-- Name: CapNhatTrangThaiDonHang PK_CapNhatTrangThaiDonHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CapNhatTrangThaiDonHang"
    ADD CONSTRAINT "PK_CapNhatTrangThaiDonHang" PRIMARY KEY ("Id");


--
-- Name: DiaChiGiaoHang PK_DiaChiGiaoHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DiaChiGiaoHang"
    ADD CONSTRAINT "PK_DiaChiGiaoHang" PRIMARY KEY ("Id");


--
-- Name: DonHangKhachHang PK_DonHangKhachHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonHangKhachHang"
    ADD CONSTRAINT "PK_DonHangKhachHang" PRIMARY KEY ("Id");


--
-- Name: GianHang PK_GianHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GianHang"
    ADD CONSTRAINT "PK_GianHang" PRIMARY KEY ("Id");


--
-- Name: GioHangKhachHang PK_GioHangKhachHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GioHangKhachHang"
    ADD CONSTRAINT "PK_GioHangKhachHang" PRIMARY KEY ("Id");


--
-- Name: MediaSanPham PK_MediaSanPham; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaSanPham"
    ADD CONSTRAINT "PK_MediaSanPham" PRIMARY KEY ("Id");


--
-- Name: NganhHang PK_NganhHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NganhHang"
    ADD CONSTRAINT "PK_NganhHang" PRIMARY KEY ("Id");


--
-- Name: PhienBanSanPham PK_PhienBanSanPham; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhienBanSanPham"
    ADD CONSTRAINT "PK_PhienBanSanPham" PRIMARY KEY ("Id");


--
-- Name: SanPham PK_SanPham; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanPham"
    ADD CONSTRAINT "PK_SanPham" PRIMARY KEY ("Id");


--
-- Name: SanPhamDonHang PK_SanPhamDonHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanPhamDonHang"
    ADD CONSTRAINT "PK_SanPhamDonHang" PRIMARY KEY ("Id");


--
-- Name: TaiKhoanKhachHang PK_TaiKhoanKhachHang; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaiKhoanKhachHang"
    ADD CONSTRAINT "PK_TaiKhoanKhachHang" PRIMARY KEY ("Id");


--
-- Name: TaiKhoanNguoiBan PK_TaiKhoanNguoiBan; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaiKhoanNguoiBan"
    ADD CONSTRAINT "PK_TaiKhoanNguoiBan" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_CapNhatTrangThaiDonHang_DonHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CapNhatTrangThaiDonHang_DonHangId" ON public."CapNhatTrangThaiDonHang" USING btree ("DonHangId");


--
-- Name: IX_DiaChiGiaoHang_TaiKhoanKhachHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_DiaChiGiaoHang_TaiKhoanKhachHangId" ON public."DiaChiGiaoHang" USING btree ("TaiKhoanKhachHangId");


--
-- Name: IX_DonHangKhachHang_KhachHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_DonHangKhachHang_KhachHangId" ON public."DonHangKhachHang" USING btree ("KhachHangId");


--
-- Name: IX_GianHang_NguoiBanId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_GianHang_NguoiBanId" ON public."GianHang" USING btree ("NguoiBanId");


--
-- Name: IX_GioHangKhachHang_KhachHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_GioHangKhachHang_KhachHangId" ON public."GioHangKhachHang" USING btree ("KhachHangId");


--
-- Name: IX_GioHangKhachHang_SanPhamId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_GioHangKhachHang_SanPhamId" ON public."GioHangKhachHang" USING btree ("SanPhamId");


--
-- Name: IX_MediaSanPham_SanPhamId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_MediaSanPham_SanPhamId" ON public."MediaSanPham" USING btree ("SanPhamId");


--
-- Name: IX_NganhHang_NganhHangChaId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_NganhHang_NganhHangChaId" ON public."NganhHang" USING btree ("NganhHangChaId");


--
-- Name: IX_PhienBanSanPham_NganhHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_PhienBanSanPham_NganhHangId" ON public."PhienBanSanPham" USING btree ("NganhHangId");


--
-- Name: IX_PhienBanSanPham_SanPhamId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_PhienBanSanPham_SanPhamId" ON public."PhienBanSanPham" USING btree ("SanPhamId");


--
-- Name: IX_SanPhamDonHang_DonHangId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_SanPhamDonHang_DonHangId" ON public."SanPhamDonHang" USING btree ("DonHangId");


--
-- Name: IX_SanPhamDonHang_PhienBanSanPhamId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_SanPhamDonHang_PhienBanSanPhamId" ON public."SanPhamDonHang" USING btree ("PhienBanSanPhamId");


--
-- Name: IX_SanPham_NguoiBanId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_SanPham_NguoiBanId" ON public."SanPham" USING btree ("NguoiBanId");


--
-- Name: CapNhatTrangThaiDonHang FK_CapNhatTrangThaiDonHang_DonHangKhachHang_DonHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CapNhatTrangThaiDonHang"
    ADD CONSTRAINT "FK_CapNhatTrangThaiDonHang_DonHangKhachHang_DonHangId" FOREIGN KEY ("DonHangId") REFERENCES public."DonHangKhachHang"("Id");


--
-- Name: DiaChiGiaoHang FK_DiaChiGiaoHang_TaiKhoanKhachHang_TaiKhoanKhachHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DiaChiGiaoHang"
    ADD CONSTRAINT "FK_DiaChiGiaoHang_TaiKhoanKhachHang_TaiKhoanKhachHangId" FOREIGN KEY ("TaiKhoanKhachHangId") REFERENCES public."TaiKhoanKhachHang"("Id");


--
-- Name: DonHangKhachHang FK_DonHangKhachHang_TaiKhoanKhachHang_KhachHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonHangKhachHang"
    ADD CONSTRAINT "FK_DonHangKhachHang_TaiKhoanKhachHang_KhachHangId" FOREIGN KEY ("KhachHangId") REFERENCES public."TaiKhoanKhachHang"("Id");


--
-- Name: GianHang FK_GianHang_TaiKhoanNguoiBan_NguoiBanId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GianHang"
    ADD CONSTRAINT "FK_GianHang_TaiKhoanNguoiBan_NguoiBanId" FOREIGN KEY ("NguoiBanId") REFERENCES public."TaiKhoanNguoiBan"("Id");


--
-- Name: GioHangKhachHang FK_GioHangKhachHang_SanPham_SanPhamId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GioHangKhachHang"
    ADD CONSTRAINT "FK_GioHangKhachHang_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES public."SanPham"("Id");


--
-- Name: GioHangKhachHang FK_GioHangKhachHang_TaiKhoanKhachHang_KhachHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GioHangKhachHang"
    ADD CONSTRAINT "FK_GioHangKhachHang_TaiKhoanKhachHang_KhachHangId" FOREIGN KEY ("KhachHangId") REFERENCES public."TaiKhoanKhachHang"("Id");


--
-- Name: MediaSanPham FK_MediaSanPham_SanPham_SanPhamId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MediaSanPham"
    ADD CONSTRAINT "FK_MediaSanPham_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES public."SanPham"("Id");


--
-- Name: NganhHang FK_NganhHang_NganhHang_NganhHangChaId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NganhHang"
    ADD CONSTRAINT "FK_NganhHang_NganhHang_NganhHangChaId" FOREIGN KEY ("NganhHangChaId") REFERENCES public."NganhHang"("Id");


--
-- Name: PhienBanSanPham FK_PhienBanSanPham_NganhHang_NganhHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhienBanSanPham"
    ADD CONSTRAINT "FK_PhienBanSanPham_NganhHang_NganhHangId" FOREIGN KEY ("NganhHangId") REFERENCES public."NganhHang"("Id");


--
-- Name: PhienBanSanPham FK_PhienBanSanPham_SanPham_SanPhamId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhienBanSanPham"
    ADD CONSTRAINT "FK_PhienBanSanPham_SanPham_SanPhamId" FOREIGN KEY ("SanPhamId") REFERENCES public."SanPham"("Id");


--
-- Name: SanPhamDonHang FK_SanPhamDonHang_DonHangKhachHang_DonHangId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanPhamDonHang"
    ADD CONSTRAINT "FK_SanPhamDonHang_DonHangKhachHang_DonHangId" FOREIGN KEY ("DonHangId") REFERENCES public."DonHangKhachHang"("Id");


--
-- Name: SanPhamDonHang FK_SanPhamDonHang_PhienBanSanPham_PhienBanSanPhamId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanPhamDonHang"
    ADD CONSTRAINT "FK_SanPhamDonHang_PhienBanSanPham_PhienBanSanPhamId" FOREIGN KEY ("PhienBanSanPhamId") REFERENCES public."PhienBanSanPham"("Id");


--
-- Name: SanPham FK_SanPham_TaiKhoanNguoiBan_NguoiBanId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanPham"
    ADD CONSTRAINT "FK_SanPham_TaiKhoanNguoiBan_NguoiBanId" FOREIGN KEY ("NguoiBanId") REFERENCES public."TaiKhoanNguoiBan"("Id");


--
-- PostgreSQL database dump complete
--

\unrestrict kPeOgPoQAtAapkhmnqQrITurrzL7YeASmgTbXLvAbPQes1AiJlvVUGQpx8tUfar

