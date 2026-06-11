import axios, { AxiosError } from "axios";
export const useAuth = () => {
  const config = useRuntimeConfig();
  const urlBase = config.public.baseUrl;
  const apiBase = config.public.apiBaseUrl;
  const userId = useCookie("userId");

  const loginApi = async (
    email: string,
    password: string,
    remember_me: boolean,
  ) => {
    const api = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: {
        Accept: "application/json",
      },
    });
    try {
      await api.get(`${urlBase}/sanctum/csrf-cookie`);

      const resp = await api.post(`${apiBase}/user/login`, {
        email,
        password,
        remember_me,
      });
      userId.value = resp.data.user_id;
      return null;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return axiosError.response?.data?.message || "Something went wrong!!!";
    }
  };

  const logoutApi = async () => {
    const api = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        Accept: "application/json",
      },
    });

    const resp = await api.post(`${apiBase}/auth/user/logout`, {
      user_id : userId.value,
    });

    return resp.data.message;
  }

  return {
    userId,
    loginApi,
    logoutApi
  };
};
