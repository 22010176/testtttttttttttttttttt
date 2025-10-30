import { createContext } from "react";

const Context = createContext();

export const PageProvider = Context.Provider;

export const defaultValue = {
  danh_sach_san_pham: [],
};


export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    // payload = [<sanPham>, ...]
    case 'SET_DANH_SACH_SAN_PHAM':
      return { ...state, danh_sach_san_pham: payload };
    default:
      return state;
  }
}
