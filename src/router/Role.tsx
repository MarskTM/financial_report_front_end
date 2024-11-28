import React from "react";
import Loading from "../components/notify/Loading";
import * as api from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";

const Role: React.FC<{ role: string[]; children: React.FC }> = ({
  role,
  children: Children,
}: {
  role: string[];
  children: React.FC;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userCredentials = useSelector((state: RootState) => state.auth.users);
  if (role === undefined || userCredentials === null) {
    api.refesh(navigate, dispatch);
  }

  var checkRole;
  for (let i = 0; i < Role.length; i++) {
    if (userCredentials.role.includes(role[i])) {
      checkRole = true;
      break;
    }
  }

  return (
    <React.Fragment>
      {checkRole !== undefined ? <Children /> : <Loading />}
    </React.Fragment>
  );
};

export default Role;
