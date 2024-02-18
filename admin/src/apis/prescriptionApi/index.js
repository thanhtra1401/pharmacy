import httpRequest from "../http";

const getPrescriptionsApi = async () => {
  const response = await httpRequest.get("/prescription");
  return response;
};
const getPrescriptionApi = async (id) => {
  const response = await httpRequest.get(`/prescription/${id}`);
  return response;
};
const updatePrescriptionApi = async (id, data) => {
  const response = await httpRequest.put(`/prescription/${id}`, data);
  return response;
};
const createPrescriptionDetailApi = async (data) => {
  const response = await httpRequest.post(`/prescription-detail`, data);
  return response;
};
export {
  getPrescriptionsApi,
  getPrescriptionApi,
  updatePrescriptionApi,
  createPrescriptionDetailApi,
};
