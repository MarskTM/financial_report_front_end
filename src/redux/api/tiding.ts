import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import { notify } from "@/utils/toast";
import * as tidingSlice from "@/redux/slices/tiding_slice";

const GetTidingByID = async (id: number) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "tidings",
      querySearch: `id = ${id}`,
      //   ignoreAssociation: [""],
    },
  });
  if (!error && response.status === 200) {
    // dispatch(tidingSlice.setListSuccess(response.data.data));
    // notify("success", "Danh sách doanh nghiệp");
    return response.data.data;
  } else {
    console.log("Company fail");
    // notify("warning", "Danh sách doanh nghiệp");
  }
};

const GetTidingList = async () => {
  const api = APIS_URL.TIDING.getall();
  const { response, error }: any = await useCallApi({
    ...api,
  });
  if (!error && response.status === 200) {
    // dispatch(tidingSlice.setListSuccess(response.data.data));
    // notify("success", "Danh sách doanh nghiệp");
    return response.data.data;
  } else {
    console.log("Company fail");
    // notify("warning", "Danh sách doanh nghiệp");
  }
};

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
};

const DeleteTiding = async (data: any) => {
  const api = APIS_URL.TIDING.delete();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: data,
  });
  if (!error && response.status === 200) {
    // notify("success", "Xóa thành công");

    console.log(response);
  } else {
    console.log("Company fail");
    notify("warning", "Xóa thất bại");
  }
};

const UpdateListTiding = async (data: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "tidings",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    // notify("success", "Cập nhật thành công");
    console.log(response);
  } else {
    console.log("Company fail");
    notify("warning", "Cập nhật thất bại");
  }
};

export {
  GetTidingByID,
  GetTidingList,
  InsertTiding,
  UpdateTiding,
  UpdateListTiding,
  DeleteTiding,
};
