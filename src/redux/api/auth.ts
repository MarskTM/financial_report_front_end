import { ROUTE } from "@/utils/route";
import { notify } from "@/utils/toast";
import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import { Credentials } from "@/redux/model";
import Cookies from "js-cookie";
import * as authSlice from "@/redux/slices/auth_slice";

const login = async (
  { username, password }: Credentials,
  navigate: any,
  dispatch: any
) => {
  dispatch(authSlice.pending());
  const api = APIS_URL.AUTH.login();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: { username, password },
  });
  if (!error && response.status === 200) {
    Cookies.set("AccessToken", response.data.data.access_token);
    Cookies.set("RefreshToken", response.data.data.refresh_token);
    dispatch(authSlice.success({ ...response.data.data }));
    dispatch(authSlice.loadProfile(response.data.data.profile));

    navigate(ROUTE.HOME.PATH);
    notify("success", "Đăng nhập thành công");
  } else {
    dispatch(authSlice.failure());
    notify("error", "Đăng nhập thất bại");
  }
};

const refesh = async (navigate: any, dispatch: any) => {
  dispatch(authSlice.pending());
  const api = APIS_URL.AUTH.refesh();
  const { response, error }: any = await useCallApi({
    ...api,
  });
  if (!error && response.status === 200) {
    Cookies.set("AccessToken", response.data.data.access_token);
    Cookies.set("RefreshToken", response.data.data.refresh_token);
    dispatch(authSlice.success({ ...response.data.data }));
    dispatch(authSlice.loadProfile(response.data.data.profile));
    // notify("success", "Chào mừng quay trở lại");
  } else {
    dispatch(authSlice.failure());
    Cookies.remove("AccessToken");
    Cookies.remove("RefreshToken");
    navigate(ROUTE.LOGIN.PATH)
    notify("error", "Làm mới thất bại");
  }
};

export { login, refesh };
