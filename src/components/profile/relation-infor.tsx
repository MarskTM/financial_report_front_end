import React from "react";
import { useForm } from "react-hook-form";
import {
  TableFinancialReportFavorite,
  ProfileNotifyTimeLine,
} from "@/components";

interface Props {}

const RelationInfor: React.FC<Props> = () => {
  return (
    <div>
      <ProfileNotifyTimeLine />
      <TableFinancialReportFavorite />
    </div>
  );
};

export default RelationInfor;
