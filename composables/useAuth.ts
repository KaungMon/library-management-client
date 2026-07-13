import axios, { AxiosError } from "axios";
export const useAuth = () => {
  const config = useRuntimeConfig();
  const urlBase = config.public.baseUrl;
  const apiBase = config.public.apiBaseUrl;
  const userId = useCookie("userId");
  const user = useState("user", () => null);
  const authLoaded = useState("authLoaded", () => false);

  const api = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        Accept: "application/json",
      },
    });
  // SECTION - login
  const loginApi = async (
    email: string,
    password: string,
    remember_me: boolean,
  ) => {
    const a = axios.create({
      withCredentials: true,
      withXSRFToken: true,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: {
        Accept: "application/json",
      },
    });
    try {
      await a.get(`${urlBase}/sanctum/csrf-cookie`);

      const resp = await a.post(`${apiBase}/user/login`, {
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
  // !SECTION

  // SECTION - logout
  const logoutApi = async () => {

    try {
      const resp = await api.post(`${apiBase}/auth/user/logout`, {
        user_id: userId.value,
      });

      return resp.data.message;
    } catch {
      return null;
    }
  };
  // !SECTION

  // SECTION - get user
  const fetchUser = async () => {
    
    try {
      const resp = await api.get(`${apiBase}/auth/user/profile/`);
      user.value = resp.data.user;
    } catch {
      user.value = null;
      userId.value = null;
    } finally {
      authLoaded.value = true;
    }
  };
  // !SECTION

  // SECTION - edit user data
  const editUserApi = async (
    email: string,
    first_name: string,
    surname: string,
    username: string,
    gender: string,
    address: string,
    phone: string,
  ) => {

    try {
      const resp = await api.put(`${apiBase}/auth/user/profile/`, {
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
  // !SECTION

  // SECTION - change password
  const changePasswordAPI = async (
    currentPassword : String,
    newPassword : String,
  ) => {
    try {
      const resp = await api.post(`${apiBase}/auth/user/profile/change_password`, {
        currentPassword,
        newPassword
      });
      console.log(
        resp.data.message
      );
      
      return resp.data.message;
    } catch {
      return null;
    }
  }
  // !SECTION

  // SECTION - delete account
  const deleteAccountApi = async (username : String) => {
    try {
      const resp = await api.delete(`${apiBase}/auth/user/profile/delete-account`, {
        data : {
          username
        }
      });

      const message = resp.data.message;
      
      return message;
    } catch {
      return null;
    }
  }
  // !SECTION

  // SECTION - update image
  const updateImageAPI = async (image : FormData) => {
    try {
      const resp = await api.post(`${apiBase}/auth/user/profile/update-image`, image);

      return resp.data.message;
    } catch {
      return null;
    }
  }
  // !SECTION

  // SECTION - delete image
  const deleteImageApi = async () => {
    try {
      const resp = await api.delete(`${apiBase}/auth/user/profile/delete-image`);

      return resp.data.message;
    } catch {
      return null;
    }
  }
  // !SECTION

  return {
    userId,
    loginApi,
    logoutApi,
    fetchUser,
    user,
    authLoaded,
    editUserApi,
    changePasswordAPI,
    deleteAccountApi,
    updateImageAPI,
    deleteImageApi,
  };
};
