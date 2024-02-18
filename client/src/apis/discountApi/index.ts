import httpRequest from "../http";

const getDiscountsApi = async (params: { valid: boolean }) => {
  const response = await httpRequest.get("/discount", { params });
  return response;
};

const getDiscountDetailApi = async (
  discountId?: string,
  params?: { page?: string | number; size?: string | number }
) => {
  const response = await httpRequest.get(`/discount-detail/${discountId}`, {
    params,
  });
  return response;
};

export { getDiscountsApi, getDiscountDetailApi };
