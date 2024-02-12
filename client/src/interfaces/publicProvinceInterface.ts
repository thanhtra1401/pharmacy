interface Province {
  province_id: string;
  province_name: string;
  province_type: string;
}
interface District {
  district_id: string;
  district_name: string;
}
interface Ward {
  ward_id: string;
  ward_name: string;
}
export type { Province, District, Ward };
