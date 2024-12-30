import React, { useEffect } from "react";
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
