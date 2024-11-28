import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultType = {
  boxShadow: " inset 0px 0px",
};

export const notify = (type: string, data: string) => {
  switch (type) {
    case "success":
      toast.success(data, {
        position: "bottom-center",
        bodyStyle: { ...defaultType },
      });
      break;
    case "error":
      toast.error(data, {
        position: "bottom-center",
        bodyStyle: { ...defaultType },
      });
      break;
    case "warning":
      toast.warning(data, {
        position: "bottom-center",
        bodyStyle: { ...defaultType },
      });
      break;
    case "info":
      toast.info(data, {
        position: "bottom-center",
        bodyStyle: { ...defaultType },
      });
      break;
  }
};
