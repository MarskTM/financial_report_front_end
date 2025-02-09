import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import { notify } from "@/utils/toast";
import * as tidingSlice from "@/redux/slices/tiding_slice";

const GetTidingList = async (dispatch: any) => {
    const api = APIS_URL.TIDING.getall();
    const { response, error }: any = await useCallApi({
        ...api,
    });
    if (!error && response.status === 200) {
        // dispatch(tidingSlice.setListSuccess(response.data.data));
        // notify("success", "Danh sách doanh nghiệp");
        return response.data.data
    } else {
        console.log("Company fail");
        // notify("warning", "Danh sách doanh nghiệp");
    }
}

const InsertTiding = async (data: any, dispatch: any) => {
  const api = APIS_URL.TIDING.create();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: data,
  });
  if (!error && response.status === 200) {
    // await dispatch(reportSlice.upsertUser(response.data.data));
    // notify("success", "Cập nhật thành công");

    console.log(response);
    return response.data.data.id;
  } else {
    console.log("Company fail");
    notify("warning", "Cập nhật thất bại");
  }
};

const UpdateTiding = async (data: any, dispatch: any) => {
    const api = APIS_URL.TIDING.update();
    const { response, error }: any = await useCallApi({
        ...api,
        payload: data,
    });
    if (!error && response.status === 200) {
        // await dispatch(reportSlice.upsertUser(response.data.data));
        // notify("success", "Cập nhật thành công");
    
        console.log(response);
        return response.data.data.id;
    } else {
        console.log("Company fail");
        notify("warning", "Cập nhật thất bại");
    }
}

const DeleteTiding = async (data: any, dispatch: any) => {
    const api = APIS_URL.TIDING.delete();
    const { response, error }: any = await useCallApi({
        ...api,
        payload: data,
    });
    if (!error && response.status === 200) {
        // await dispatch(reportSlice.deleteUser(response.data.data));
        // notify("success", "Xóa thành công");
    
        console.log(response);
    } else {
        console.log("Company fail");
        notify("warning", "Xóa thất bại");
    }
}


export { GetTidingList, InsertTiding, UpdateTiding, DeleteTiding };
