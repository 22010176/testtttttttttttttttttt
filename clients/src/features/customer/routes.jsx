export const ROUTE_KEYS = {
  ACCOUNT: "tai-khoan",
  REGISTER: "dang-ki",
  LOGIN: "dang-nhap",
  INFOMATION: "thong-tin",
  PROFILE: "ho-so",
  ADDRESS: "dia-chi",
  TRACKING: 'theo-doi',

  SHOPPING_CART: "gio-hang",
  CHECKOUT: "thanh-toan",

  MANAGEMENT: "quan-ly",
  DASHBOARD: "dashboard",
  INSERT: "them",
  UPDATE: "chinh-sua",
  DELETE: "xoa",

  PRODUCTS: "san-pham",
  DETAILS: "chi-tiet",

  ORDERS: "don-hang",
  RETURN: "tra-hang",

  MARKETING: "marketing",
  DISCOUNTS: "khuyen-mai",
  FLASH_SALE: "flash-sale",
  VOUCHER: "ma-giam-gia",
  CAMPAIGNS: "chuong-trinh-san",

  FINANCE: "tai-chinh",
  PROFIT: "loi-nhuan",
  BALANCE: "so-du-tai-khoan",
  BANK_ACCOUNT: "tai-khoan-ngan-hang",


  ANALYTICS: "phan-tich",
  PERFORMANCE: "nang-suat",
  SERVICE: "dich-vu",
  TRAFFIC: "truy-cap",

  STORE: "cua-hang",
  NOT_FOUND: "*",
  BY_ID: ":id"
};

export const routePaths = {
  account: {
    root: `/${ROUTE_KEYS.ACCOUNT}`,
    register: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.REGISTER}`,
    login: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.LOGIN}`,
    infomation: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.INFOMATION}`,
    profile: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.PROFILE}`,
    address: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.ADDRESS}`,
    tracking: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.TRACKING}/${ROUTE_KEYS.BY_ID}`
  },

  root: `/${ROUTE_KEYS.MANAGEMENT}`,
  product: {
    details: `${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.BY_ID}`
    // root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}`,
    // insert: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.INSERT}`
  },
  orders: {
    root: `/${ROUTE_KEYS.ORDERS}`,
    carts: `/${ROUTE_KEYS.SHOPPING_CART}`,
    checkout: `/${ROUTE_KEYS.CHECKOUT}`,
    // return: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.ORDERS}/${ROUTE_KEYS.RETURN}`
  },
  marketing: {
    // root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}`,
    // discounts: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.DISCOUNTS}`,
    // flashSale: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.FLASH_SALE}`,
    // voucher: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.VOUCHER}`,
    // campaigns: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.CAMPAIGNS}`
  },

  finance: {
    // root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}`,
    // profit: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.PROFIT}`,
    // balance: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.BALANCE}`,
    // bankAccount: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.BANK_ACCOUNT}`,
  },

  analytics: {
    // root: `/${ROUTE_KEYS.ANALYTICS}`,
    // product: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PRODUCTS}`,
    // profit: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PROFIT}`,
    // service: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.SERVICE}`,
    // traffic: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.TRAFFIC}`,
    // marketing: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.MARKETING}`,
    // performance: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PERFORMANCE}`
  }
};
