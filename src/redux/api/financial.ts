import { APIS_URL } from "@/utils/api";
import { useCallApi } from "./api-call";
import { notify } from "@/utils/toast";
import * as reportSlice from "@/redux/slices/report_slice";

const UpsertUserReport = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "userReports",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.upsertUserReport(response.data.data));
    // notify("success", "Cập nhật thành công");

    console.log(response);
    return response.data.data.id;
  } else {
    console.log("Company fail");
    notify("warning", "Cập nhật thất bại");
  }
};

const UpsertCompanyReport = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "companyReports",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.upsertCompanyReport(response.data.data));
    // notify("success", "Cập nhật thành công");

    console.log(response);
    return response.data.data.id;
  } else {
    console.log("Company fail");
    notify("warning", "Cập nhật thất bại");
  }
};

const UpsertReportData = async (data: any, dispatch: any) => {
  const api = APIS_URL.BASIC.upsert();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "financialReports",
      data: data,
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.upsertUserReportData(response.data.data));
    notify("success", "Cập nhật thành công");

    console.log(response);
  } else {
    console.log("Company fail");
    notify("warning", "Cập nhật báo cáo thất bại");
  }
};

const GetUserReport = async (id: number, dispatch: any) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "userReports",
      querySearch: `id = ${id}`,
      ignoreAssociation: [],
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.upsertUserReport(response.data.data[0]));
    // console.log("reports history:", response.data.data);
    // notify("success", "Lịch sử phân tích");
    // return response.data.data;
  } else {
    console.log("Company fail");
    // notify("warning", "Lịch sử phân tích");
  }
};

const GetCompanyReportData = async (dispatch: any, id: number) => {
  const api = APIS_URL.ADVANCE.filter();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      modelType: "companyReports",
      querySearch: `company_id = ${id}`,
      ignoreAssociation: [],
      sort: "desc",
    },
  });
  if (!error && response.status === 200) {
    await dispatch(reportSlice.upsertCompanyReport(response.data.data[0]));
    console.log("reports history:", response.data.data[0]);
    // notify("success", "Lịch sử phân tích");
    // return response.data.data;
  } else {
    console.log("Company fail");
    // notify("warning", "Lịch sử phân tích");
  }
};

const UploadFileReport = async (file: File) => {
  const api = APIS_URL.BASIC.uploadFile();
  const formData = new FormData();
  formData.append("file", file);
  const { response, error }: any = await useCallApi({
    ...api,
    payload: formData,
  });

  if (!error && response.status === 200) {
    console.log("File uploaded successfully:", response.data.data);
    return response.data.data;
  } else {
    console.log("File upload failed:", error);
    return null;
  }
};

const DeleteUserReport = async (
  id: number,
  fileName: string,
  dispatch: any
) => {
  const api = APIS_URL.BASIC.deleteReport();
  const { response, error }: any = await useCallApi({
    ...api,
    payload: {
      id: id,
      fileName: fileName,
    },
  });

  if (!error && response.status === 200) {
    console.log("Delete report successfully:", response.data.data);
    return response.data.data;
  } else {
    console.log("Delete report failed:", error);
    return null;
  }
};

export {
  UpsertUserReport,
  UpsertReportData,
  UpsertCompanyReport,
  UploadFileReport,
  GetCompanyReportData,
  GetUserReport,
  DeleteUserReport,
};
