import React, { useState } from 'react';
import { Timeline, Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

interface Notification {
	date: string;
	message: string;
}

const notifications: Notification[] = [
	{ date: '2015-09-01', message: 'Create a services' },
	{ date: '2015-09-01 09:12:11', message: 'Solve initial network problems' },
	{ date: '2015-09-01 09:12:11', message: 'Technical testing' },
	{ date: '2015-09-01 09:12:11', message: 'Network problems being solved' },
];

const SystemNotifyTimeline: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="p-6 bg-white">
			<div className="flex flex-row justify-between">
				<h2 className="text-lg font-bold pb-2 mb-2">Thông báo hệ thống</h2>
				<Button
					icon={<CodeOutlined />}
					onClick={() => setShowModal(!showModal)}
					className="mx-2"
				>
					Cập nhật
				</Button>
			</div>
			<Timeline
				mode="right"
				items={[
					{
						label: '2015-09-01',
						children: `Lưu phân tích báo cáo "Báo cáo tài chính 2024" thành công`,
					},
					{
						label: '2015-09-01 09:12:11',
						children: 'Solve initial network problems',
					},
					{
						children: 'Technical testing',
					},
					{
						label: '2015-09-01 09:12:11',
						children: 'Network problems being solved',
					},
				]}
				className="w-full h-[340px] py-2 overflow-y-scroll"
			/>
		</div>
	);
};

export default SystemNotifyTimeline;
