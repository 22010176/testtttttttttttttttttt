import { ROUTE_KEYS } from "@/constant/route_keys";

//   SHOPPING_CART: "gio-hang",
//   CHECKOUT: "thanh-toan",

//   MANAGEMENT: "quan-ly",
//   DASHBOARD: "dashboard",
//   INSERT: "them",
//   UPDATE: "chinh-sua",
//   DELETE: "xoa",

//   PRODUCTS: "san-pham",
//   DETAILS: "chi-tiet",

//   ORDERS: "don-hang",
//   RETURN: "tra-hang",

//   MARKETING: "marketing",
//   DISCOUNTS: "khuyen-mai",
//   FLASH_SALE: "flash-sale",
//   VOUCHER: "ma-giam-gia",
//   CAMPAIGNS: "chuong-trinh-san",

//   FINANCE: "tai-chinh",
//   PROFIT: "loi-nhuan",
//   BALANCE: "so-du-tai-khoan",
//   BANK_ACCOUNT: "tai-khoan-ngan-hang",


//   ANALYTICS: "phan-tich",
//   PERFORMANCE: "nang-suat",
//   SERVICE: "dich-vu",
//   TRAFFIC: "truy-cap",

//   SEARCH: "tim-kiem",
//   STORE: "cua-hang",
//   NOT_FOUND: "*",
//   BY_ID: ":id"
// };

export const routePaths = {
  account: {
    root: `/${ROUTE_KEYS.ACCOUNT}`,
    register: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.REGISTER}`,
    login: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.LOGIN}`,

    infomation: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.INFOMATION}`,
    profile: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.PROFILE}`,
    address: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.ADDRESS}`,
    not_found: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.NOT_FOUND}`,
    change_password: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.CHANGE_PASSWORD}`,
  },

  root: `/`,
  search: `/${ROUTE_KEYS.SEARCH}`,
  shop: `/${ROUTE_KEYS.STORE}`,
  // register: `/${ROUTE_KEYS.REGISTER}`,
  // login: `/${ROUTE_KEYS.LOGIN}`,

  product: {
    details: `/${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.BY_ID}`,
    root: `/${ROUTE_KEYS.PRODUCTS}`,
    // insert: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.INSERT}`
  },
  orders: {
    root: `/${ROUTE_KEYS.ORDERS}`,
    carts: `/${ROUTE_KEYS.SHOPPING_CART}`,
    checkout: `/${ROUTE_KEYS.CHECKOUT}`,
    tracking: `/${ROUTE_KEYS.ORDERS}/${ROUTE_KEYS.BY_ID}`
  },
};
