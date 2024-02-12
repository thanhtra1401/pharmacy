interface Address {
  id?: number;
  customerId?: number;
  province?: string;
  provinceCode?: string;
  district?: string;

  districtCode?: string;

  ward?: string;
  wardCode?: string;
  detail?: string;
  defaultAddress?: boolean;
  receiveName?: string;
  receivePhone?: string;
}
export type { Address };
