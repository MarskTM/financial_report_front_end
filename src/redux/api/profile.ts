import { notify } from "@/utils/toast";
import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import * as authSlice from "@/redux/slices/auth_slice";

const UpsertProfile = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "profiles",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    await dispatch(dispatch(authSlice.loadProfile(response.data.data.profile)));
    notify("success", "Cập nhật thành công");

    console.log(response);
    return response.data.data.id;
  } else {
    notify("warning", "Cập nhật thất bại");
  }
};

export { UpsertProfile };