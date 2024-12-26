import React, { useEffect } from "react";
import Loading from "../components/notify/Loading";
import * as api from "@/redux/api/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/Store";

interface RoleProps {
  roles: string[];
  children: React.FC; // Thay đổi từ React.FC thành React.ReactNode
}

const Role: React.FC<RoleProps> = ({ roles: roles, children: Children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userCredentials = useSelector((state: RootState) => state.auth.users);
  var checkRole;

  useEffect(() => {
    if (userCredentials.role === "") {
      api.refesh(navigate, dispatch);
    }

    for (let i = 0; i < roles.length; i++) {
      if (userCredentials.role.includes(roles[i])) {
        checkRole = true;
        break;
      }
    }
  }, [userCredentials.role]);

  return (
    <React.Fragment>
      {checkRole === undefined ? (
        <Children />
      ) : (
        <div>{`Vui lòng đăng nhập với vai trò ${roles}`}</div>
      )}
    </React.Fragment>
  );
};

export default Role;
