import React from 'react';
import { Header, SidebarMenu, RelationInfor, UserInfor } from '@/components';

interface Props {}

const Profile: React.FC<Props> = ({}) => {
	return (
		<div className="w-screen h-full bg-slate-100 relative">
			<div className="w-[83%] fixed top-3 left-72 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/News" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-28 pb-8 ml-72 z-40 flex flex-row space-x-6">
				<div className="bg-white w-1/2 h-full relative">
					<UserInfor />
				</div>
				<div className="bg-white w-3/5 h-full">
					<RelationInfor />
				</div>
			</div>
		</div>
	);
};

export default Profile;
