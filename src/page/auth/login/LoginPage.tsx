import React from "react";
import { LoginFrom, LoginContent } from "../../../components";
interface Props {}

const LoginPage: React.FC<Props> = ({}) => {
  return (
		<div className="w-svw h-full flex flex-row items-center justify-center bg-slate-100">
			<LoginContent />

			<div>
				<LoginFrom />
			</div>
		</div>
  );
};

export default LoginPage;
