export interface ResponseApi<Data> {
  success: boolean;
  message: string;
  data?: Data;
}
