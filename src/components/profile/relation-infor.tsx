import React, { useEffect } from "react";
import {
  TableFinancialReportFavorite,
  ProfileNotifyTimeLine,
} from "@/components";
import * as api from "@/redux/api/profile";
import { RootState } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const RelationInfor: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.GetUserHistoryReport(dispatch);
  }, []); // Replace with your actual API call to fetch data
  
  return (
    <div>
      <ProfileNotifyTimeLine />
      <TableFinancialReportFavorite />
    </div>
  );
};

export default RelationInfor;
