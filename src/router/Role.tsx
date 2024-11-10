import React from "react";
import Loading from "../components/notify/Loading";

const Role: React.FC<{ role: string[]; children: React.FC }> = ({
  role,
  children: Children,
}: {
  role: string[];
  children: React.FC;
}) => {
  let userCredentials = ["user", "andmin"];
  var checkRole;
  for (let i = 0; i < Role.length; i++) {
    if (userCredentials.includes(role[i])) {
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
