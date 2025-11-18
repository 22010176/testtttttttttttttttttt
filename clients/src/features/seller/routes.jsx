import { ROUTE_KEYS } from "@/constant/route_keys";

export const routePaths = {
  account: {
    root: `/${ROUTE_KEYS.ACCOUNT}`,
    register: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.REGISTER}`,
    login: `/${ROUTE_KEYS.ACCOUNT}/${ROUTE_KEYS.LOGIN}`
  },
  management: {
    root: `/${ROUTE_KEYS.MANAGEMENT}`,
    product: {
      root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}`,
      insert: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.INSERT}`,
      update: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.PRODUCTS}/${ROUTE_KEYS.UPDATE}/${ROUTE_KEYS.BY_ID}`
    },
    orders: {
      root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.ORDERS}`,
      return: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.ORDERS}/${ROUTE_KEYS.RETURN}`
    },
    marketing: {
      root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}`,
      discounts: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.DISCOUNTS}`,
      flashSale: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.FLASH_SALE}`,
      voucher: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.VOUCHER}`,
      campaigns: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.MARKETING}/${ROUTE_KEYS.CAMPAIGNS}`
    },

    finance: {
      root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}`,
      profit: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.PROFIT}`,
      balance: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.BALANCE}`,
      bankAccount: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.FINANCE}/${ROUTE_KEYS.BANK_ACCOUNT}`,
    },
    store: {
      root: `/${ROUTE_KEYS.MANAGEMENT}/${ROUTE_KEYS.STORE}`,
    }
  },
  analytics: {
    root: `/${ROUTE_KEYS.ANALYTICS}`,
    product: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PRODUCTS}`,
    profit: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PROFIT}`,
    service: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.SERVICE}`,
    traffic: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.TRAFFIC}`,
    marketing: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.MARKETING}`,
    performance: `/${ROUTE_KEYS.ANALYTICS}/${ROUTE_KEYS.PERFORMANCE}`
  }
};
