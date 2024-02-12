import axios from "axios";
const getProvincesApi = async () => {
  const response = await axios.get("https://vapi.vnappmob.com/api/province");
  return response;
};
const getDistrictsApi = async (province_id: string) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${province_id}`
  );
  return response;
};
const getWardsApi = async (district_id: string) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/ward/${district_id}`
  );
  return response;
};
export { getProvincesApi, getDistrictsApi, getWardsApi };
