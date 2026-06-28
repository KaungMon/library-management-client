import axios, { AxiosError } from "axios";
export const useAuth = () => {
  const config = useRuntimeConfig();
  const urlBase = config.public.baseUrl;
  const apiBase = config.public.apiBaseUrl;
  const userId = useCookie("userId");
  const user = useState("user", () => null);
  const authLoaded = useState("authLoaded", () => false);

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

    try {
      const resp = await api.post(`${apiBase}/auth/user/logout`, {
        user_id: userId.value,
      });

      return resp.data.message;
    } catch {
      return null;
    }
  };

  const fetchUser = async () => {
    const api = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        Accept: "application/json",
      },
    });
    try {
      const resp = await api.get(`${apiBase}/auth/user/profile`);
      user.value = resp.data.user;
    } catch {
      user.value = null;
      userId.value = null;
    } finally {
      authLoaded.value = true;
    }
  };

  const editUserApi = async (
    email: string,
    first_name: string,
    surname: string,
    username: string,
    gender: string,
    address: string,
    phone: string,
  ) => {
    const api = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        Accept: "application/json",
      },
    });

    try {
      const resp = await api.post(`${apiBase}/auth/user/edit`, {
        email,
        first_name,
        surname,
        username,
        gender,
        address,
        phone,
      });

      user.value = resp.data.user;
      return resp.data.message;
    } catch {
      return null;
    }
  };

  return {
    userId,
    loginApi,
    logoutApi,
    fetchUser,
    user,
    authLoaded,
    editUserApi,
  };
};
