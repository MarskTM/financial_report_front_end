import { notify } from "@/utils/toast";
import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import * as authSlice from "@/redux/slices/auth_slice";
import * as reportSlice from "@/redux/slices/report_slice";
import { useSelector } from "react-redux";

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

const GetUserHistoryReport = async (profieId: number, dispatch: any) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "userReports",
      querySearch: `profile_id = ${profieId}`,
      ignoreAssociation: ["all"],
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.getHistoryReport(response.data.data));
    console.log("reports history:", response.data.data);
    notify("success", "Lịch sử phân tích");
    // return response.data.data;
  } else {
    console.log("Company fail");
    notify("warning", "Lịch sử phân tích");
  }
};

export { UpsertProfile, GetUserHistoryReport };
