import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { clearLS, getLS, saveProfile, setLS } from "../utils/function";

class Http {
  instance: AxiosInstance;
  private accessToken: string | null;
  // private refreshToken = async () => {
  //   try {
  //     const response = await this.instance.get("/user/refresh-token");
  //     this.accessToken = response.data?.data.accessToken;
  //     setLS("access_token", "Bearer " + this.accessToken);
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // };
  constructor() {
    this.accessToken = getLS("access_token");
    this.instance = axios.create({
      baseURL: "http://localhost:8000/api",
      timeout: 10000, // 10 seconds
      headers: {
        "Content-Type": "application/json",
      },
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
        if (url === "user/login") {
          const data = response.data.data;
          if (data) {
            const profile = { ...data };
            delete profile["accessToken"];
            this.accessToken = data.accessToken as string;
            setLS("access_token", this.accessToken);
            saveProfile(profile);
          }
        }
        if (url === "/user/logout") {
          this.accessToken = "";
          clearLS("access_token");
          clearLS("profile");
        }
        return response;
      },
      (error) => {
        if (error.response.status === 422) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
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
