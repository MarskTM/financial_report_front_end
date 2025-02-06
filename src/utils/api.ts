import { UpdateUserState } from "@/redux/api/auth";
import Cookies from "js-cookie";

// ---------------------------- Handel Request With Authen Token -------------------------------------
export const HEADERS = {
  header: () => ({
    accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  }),

  headerToken: () => ({
    accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    authorization: `Bearer ${Cookies.get("AccessToken")}`,
  }),

  headerRefesh: () => ({
    accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    authorization: `Bearer ${Cookies.get("AccessToken")};${Cookies.get(
      "RefreshToken"
    )}`,
  }),

  file_header: () => ({
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${Cookies.get("AccessToken")};${Cookies.get(
      "RefreshToken"
    )}`,
  }),
};

// --------------------------------- Declare Backend Router End-Point -------------------------------
export const APIS_URL = {
  AUTH: {
    login: () => ({
      endPoint: "/login",
      method: "post",
      headers: HEADERS.header(),
    }),

    logout: () => ({
      endPoint: "/logout",
      method: "POST",
      headers: HEADERS.headerToken(),
    }),

    refesh: () => ({
      endPoint: "/refresh",
      method: "POST",
      headers: HEADERS.headerRefesh(),
    }),

    register: () => ({
      endPoint: "/users/register",
      method: "POST",
      headers: HEADERS.header(),
    }),

    forgotPassword: () => ({
      endPoint: "/users/forgot-password",
      method: "POST",
      headers: HEADERS.header(),
    }),

    getListUsers: () => ({
      endPoint: "/users/all",
      method: "GET",
      headers: HEADERS.headerToken(),
    }),

    updateUserState: () => ({
      endPoint: "/users/update-state",
      method: "PUT",
      headers: HEADERS.headerToken(),
    }),

    updateUserRoles: () => ({
      endPoint: "/users/update-role",
      method: "PUT",
      headers: HEADERS.headerToken(),
    }),
  },

  USER: {
    reset: () => ({
      endPoint: "/users/reset-password",
      method: "POST",
      headers: HEADERS.headerToken(),
    }),

    update: () => ({
      endPoint: "/users/change-password",
      method: "PUT",
      headers: HEADERS.headerToken(),
    }),
  },

  ADVANCE: {
    filter: () => ({
      endPoint: "/advance-filter",
      method: "POST",
      headers: HEADERS.headerToken(),
    }),
  },

  BASIC: {
    upsert: () => ({
      endPoint: "/basic-query",
      method: "POST",
      headers: HEADERS.headerToken(),
    }),

    delete: () => ({
      endPoint: "/basic-query",
      method: "DELETE",
      headers: HEADERS.headerToken(),
    }),

    uploadFile: () => ({
      endPoint: "/financial-report/upload",
      method: "POST",
      headers: HEADERS.file_header(),
    }),

    deleteReport: () => ({
      endPoint: "/financial-report/delete",
      method: "DELETE",
      headers: HEADERS.headerToken(),
    }),
  },
};
