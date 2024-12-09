import {
	Header,
	SidebarMenu,
	AuthorUser,
	UserActiveChart,
	TidingCard,
	TableTidingCrawl,
} from '@/components';
import { Tabs } from 'antd';

import type { TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Statistic, Input, Button } from 'antd';

const items: TabsProps['items'] = [
	// {
	//   key: "1",
	//   label: "Tài Nguyên Hệ Thống",
	//   children: "Content of Tab Pane 2",
	// },
	{
		key: '2',
		label: 'Phân Quyền Người Dùng',
		children: <AuthorUser />,
	},
];

const { Search } = Input;

interface Props {}

const SystemInfor: React.FC<Props> = ({}) => {
	return (
		<div className="w-screen h-full bg-slate-100 relative">
			<div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/Analyst" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
				<div className="w-full bg-white flex flex-row">
					<div className="w-1/3 h-96 mt-10 ml-5 pl-5 border-r-2">
						<Row gutter={16} className="p-8">
							<Col span={10}>
								<Statistic title="Người Dùng Active" value={1103} />
							</Col>
							<Col span={10}>
								<Statistic title="Số Lượng Truy Cập" value={112893} />
							</Col>
						</Row>
						<UserActiveChart />
					</div>
					<div className="w-2/3 h-[500px] p-4 relative">
						<Tabs defaultActiveKey="2" items={items} />
					</div>
				</div>

				<div className="w-full h-[550px] mt-5 flex flex-row gap-4">
					<div className="w-3/5 p-4 bg-white relative">
						<div className="flex flex-row absolute right-4 top-6">
							<Search
								className=""
								placeholder="Tìm kiếm người dùng"
								// onSearch={onSearch}
								allowClear
								style={{ width: 400 }}
							/>
						</div>
						<h2 className="my-2 pb-4 text-lg font-semibold border-b-2">
							Tin Tức Trong Ngày
						</h2>
						<div className="h-[450px] flex flex-wrap overflow-y-scroll scroll-smooth">
							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>
							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>
							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>

							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>

							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>

							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>

							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>
							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>
							<TidingCard
								title="Giá vàng bất ngờ đảo chiều, nhiều người ‘đứng ngồi không yên"
								img="https://cafefcdn.com/zoom/223_140/203337114487263232/2024/11/27/avatar1732689494994-17326894952241900126270.jpeg"
							/>
						</div>
					</div>

					<div className="w-2/5 bg-white">
						<div>
							<TableTidingCrawl />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SystemInfor;
