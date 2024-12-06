import { Table } from 'antd';
import { FieldBalanceDefinitions, BalanceSheetModel } from '@/redux/model/balance_sheet';
import { FieldCashFlowDefinitions, CashFlowModel } from '@/redux/model/cash_flow';
import {
	FieldIncomeDefinitions,
	IncomeStatementModel,
} from '@/redux/model/income_statement';


interface Props<T> {
	data?: { [year: string]: T } | null;
	fieldDefinitions: Record<string, string>;
	maxCol?: number;
	quarter?: string;
	reportYear?: string;
}

export const TableFinancialExtract = <T,>({
	data,
	fieldDefinitions,
	maxCol,
	quarter,
	reportYear,
}: Props<T>) => {
	const maxColumns = maxCol ?? 5;

	const period = `${quarter} ${reportYear}`; // Tạo period từ quarter và reportYear

	const indicators = Object.keys(fieldDefinitions);
	const dataSource = indicators.map((indicator, index) => {
		const row: {
			key: string;
			name: string;
			[quarter: string]: number | string;
		} = {
			key: `${index}`,
			name: fieldDefinitions[indicator],
		};

		Object.keys(data || {}).forEach((quarter) => {
			const value = data?.[quarter]?.[indicator as keyof T];
			row[quarter] =
				typeof value === 'number' || typeof value === 'string' ? value : '-';
		});

		return row;
	});

	// Lọc và sắp xếp cột
	console.log(period);

	let sortedColumns = [];
	if (quarter && reportYear) {
		// Lấy danh sách các cột (keys) từ data và tìm chỉ mục của period
		const keys = Object.keys(data || {});
		const startIndex = keys.indexOf(period); // Tìm vị trí của period trong mảng keys

		// Nếu period tồn tại trong keys, lấy các phần tử từ vị trí đó
		sortedColumns =
			startIndex !== -1 ? keys.slice(startIndex, startIndex + maxColumns) : [];
	} else {
		// Nếu không có period, lấy toàn bộ keys
		sortedColumns = Object.keys(data || {});
	}

	const columns = [
		{
			title: 'Chỉ tiêu',
			dataIndex: 'name',
			key: 'name',
			fixed: 'left' as const,
			render: (value: string) => (
				<button className="w-80 text-left">{value}</button>
			),
		},
		...sortedColumns.slice(-maxColumns).map((quarter) => ({
			title: quarter,
			dataIndex: quarter,
			key: quarter,
			align: 'center' as const,
			render: (value: number | string) =>
				typeof value === 'number' ? value.toLocaleString() : value,
		})),
	];

	return (
		<div>
			{data ? (
				<Table
					columns={columns}
					dataSource={dataSource}
					rowKey="key"
					pagination={false}
					scroll={{ x: 'max-content' }}
				/>
			) : (
				<Table columns={[]} dataSource={[]} rowKey="key" pagination={false} />
			)}
		</div>
	);
};

export const BalanceSheetTable = ({
	data,
	maxCol,
}: {
	data: { [year: string]: BalanceSheetModel } | null;
	maxCol?: number;
}) => (
	<TableFinancialExtract<BalanceSheetModel>
		data={data}
		fieldDefinitions={FieldBalanceDefinitions}
		maxCol={maxCol}
	/>
);

export const CashFlowTable = ({
	data,
	maxCol,
}: {
	data: { [year: string]: CashFlowModel } | null;
	maxCol?: number;
}) => (
	<TableFinancialExtract<CashFlowModel>
		data={data}
		fieldDefinitions={FieldCashFlowDefinitions}
		maxCol={maxCol}
	/>
);

export const IncomeStatementTable = ({
	data,
	maxCol,
}: {
	data: { [year: string]: IncomeStatementModel } | null;
	maxCol?: number;
}) => (
	<TableFinancialExtract<IncomeStatementModel>
		data={data}
		fieldDefinitions={FieldIncomeDefinitions}
		maxCol={maxCol}
	/>
);