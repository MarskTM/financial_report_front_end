import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import { notify } from "@/utils/toast";
import * as companySlice from "@/redux/slices/company_slice";

const UpsertCompany = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "companies",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    await dispatch(companySlice.setInsertCompany(response.data.data));
    // notify("success", "Cập nhật thành công");

    console.log(response);
    return response.data.data.id;
  } else {
    console.log("Company fail");
    // notify("warning", "Cập nhật thất bại");
  }
};

const UpsertCompanyStakeholder = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "companyStakeholders",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    dispatch(companySlice.setStakeHodler(response.data.data));
    // notify("success", "Cập nhật thành công");
  } else {
    console.log("Company fail");
    // notify("warning", "Cập nhật thất bại");
  }
};

const GetAllCompany = async (dispatch: any) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "companies",
      ignoreAssociation: ["all"],
      // page: currentPage,
      // pageSize: pageSize,
      // isPaginateDB: true,
    },
  });
  if (!error && response.status === 200) {
    dispatch(companySlice.setListSuccess(response.data.data));
    // notify("success", "Danh sách doanh nghiệp");
  } else {
    console.log("Company fail");
    // notify("warning", "Lấy dữ liệu thất bại");
  }
};

const GetCompanyByID = async (dispatch: any, id: number) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      querySearch: `id = ${id}`,
      modelType: "companies",
      ignoreAssociation: [],
    },
  });
  if (!error && response.status === 200) {
    dispatch(companySlice.setCompany(response.data.data[0]));
    // notify("success", "Thông tin doanh nghiệp");
  } else {
    console.log("Company fail");
    // notify("warning", "Lấy dữ liệu thất bại");
  }
};

export {
  UpsertCompany,
  GetAllCompany,
  GetCompanyByID,
  UpsertCompanyStakeholder,
};
