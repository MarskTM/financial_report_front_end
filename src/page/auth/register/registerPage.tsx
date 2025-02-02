import React from "react";
import { SignUpForm } from "@/components";
interface Props {}

const RegisterPage: React.FC<Props> = ({}) => {
  return (
    <div className="w-svw h-full flex flex-row items-center justify-center bg-slate-100">
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
