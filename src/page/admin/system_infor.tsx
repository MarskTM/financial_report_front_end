import {
	Header,
	SidebarMenu,
	FinancialReportDetail,
	HealthyEnterpriseChart,
} from '@/components';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '1',
		label: 'Tab 1',
		children: 'Content of Tab Pane 1',
	},
	{
		key: '2',
		label: 'Tab 2',
		children: 'Content of Tab Pane 2',
	},
	{
		key: '3',
		label: 'Tab 3',
		children: 'Content of Tab Pane 3',
	},
];

type Props = {};

const SystemInfor = (props: Props) => {
	return (
		<div className="w-screen h-svh bg-slate-100 relative overflow-y-scroll">
			<div className="w-[83%] fixed top-3 left-72 pl-2 z-50">
				<Header />
			</div>

			{/* Navbar Position */}
			<div className="w-72 h-[97vh] fixed top-3 ml-3 pr-6 z-50">
				<SidebarMenu defaultLink="/home/Analyst" />
			</div>

			{/* Page Content */}
			<div className="w-[83%] h-full pt-32 mb-10 ml-72 pl-2 z-40">
				<Tabs defaultActiveKey="3" items={items} onChange={onChange} />
			</div>
		</div>
	);
};

export default SystemInfor;
