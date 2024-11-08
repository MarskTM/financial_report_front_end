import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Role: React.FC<{ role: string[]; children: React.FC }> = ({
  role,
  children: Children,
}: {
  role: string[];
  children: React.FC;
}) => {
  let userCredentials = "user"
  var checkRole;
  for (let i = 0; i < Role.length; i++) {
    if (role[i] === "user") {
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
