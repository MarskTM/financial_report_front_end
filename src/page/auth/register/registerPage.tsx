import React from "react";
import { SignUpForm } from "@/components";
interface Props {}

const RegisterPage: React.FC<Props> = ({}) => {
  return (
    <div className="w-svw h-full flex flex-row items-center justify-center bg-slate-50">
      <div className="w-lvw">
        <SignUpForm />
      </div>
    </div>
  );
};

export default RegisterPage;
