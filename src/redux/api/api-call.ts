import axios from "axios";
interface UseCallApiProps {
  endPoint: string;
  method: string;
  payload?: any;
  headers?: any;
  params?: any;
}

export const useCallApi = async (props: UseCallApiProps) => {
  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { endPoint, headers, method, params, payload } = props;
  console.log(baseURL + endPoint);
  try {
    const result = await axios({
      method,
      url: baseURL + endPoint,
      headers,
      data: payload,
      params,
    });
    return {
      response: result,
      error: null,
    };
  } catch (e: any) {
    return {
      response: null,
      error: e.request,
    };
  }
};

