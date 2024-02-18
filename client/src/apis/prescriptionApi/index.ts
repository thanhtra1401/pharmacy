import httpRequest from "../http";

const getPrescriptionsApi = async (params: { customerId: number }) => {
  const response = await httpRequest.get("/prescription", { params });
  return response;
};
const getPrescriptionApi = async (id?: string) => {
  const response = await httpRequest.get(`prescription/${id}`);
  return response;
};
const createPrescriptionApi = async (customerId: number, file: FormData) => {
  const response = await httpRequest.put(
    `prescription/create-upload-image?customerId=${customerId}`,
    file
  );
  return response;
};

const deletePrescriptionApi = async (id: number) => {
  const response = await httpRequest.delete(`prescription/${id}`);
  return response;
};

export {
  getPrescriptionsApi,
  getPrescriptionApi,
  createPrescriptionApi,
  deletePrescriptionApi,
};
