import axios, { HttpStatusCode } from "axios";
import { clearLS, getLS, setLS } from "../utils/function";
import Swal from "sweetalert2";

class Http {
  instance;
  accessToken;

  constructor() {
    this.accessToken = getLS("access_token");
    this.instance = axios.create({
      baseURL: "http://localhost:8000/api",
      timeout: 10000, // 10 seconds

      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = "Bearer " + this.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/user/login") {
          const data = response.data.data;
          if (data) {
            if (data.role === 0) {
              Swal.fire({
                title: "Thất bại",
                text: "Tài khoản không có quyền truy cập",
                icon: "error",
              });
              return false;
            }
            setLS("role", data.role);
            setLS("user_id", data.id);
            this.accessToken = data.accessToken;
            setLS("access_token", this.accessToken);
          }
        }
        if (url === "/user/logout") {
          this.accessToken = "";
          clearLS("access_token");
          clearLS("user_id");
        }
        return response;
      },
      (error) => {
        if (error.response.status === 422) {
          const data = error.response?.data;
          const message = data?.message || error.message;
          alert(message);
        }
        if (error.response.status === HttpStatusCode.Unauthorized) {
          clearLS("access_token");
        }

        // if (error.response.status === HttpStatusCode.Unauthorized) {
        //   this.refreshToken();
        // }
        // if (
        //   error.response.status === 500 &&
        //   error.response.data.message === "jwt malformed"
        // ) {
        //   this.refreshToken();
        // }
        return Promise.reject(error);
      }
    );
  }
}

const httpRequest = new Http().instance;

export default httpRequest;
