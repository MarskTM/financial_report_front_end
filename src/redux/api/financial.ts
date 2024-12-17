import { APIS_URL } from '@/utils/api';
import { useCallApi } from './api-call';
import { notify } from '@/utils/toast';
import * as reportSlice from '@/redux/slices/report_slice';



const UpsertUserReport = async (data: any, dispatch: any) => {
	const api = APIS_URL.BASIC.upsert();
	const { response, error }: any = await useCallApi({
		...api,
		payload: {
			modelType: 'userReports',
			data: data,
		},
	});
	if (!error && response.status === 200) {
		await dispatch(reportSlice.responeUpsert(response.data.data));
		notify('success', 'Cập nhật thành công');

		console.log(response);
		return response.data.data.id;
	} else {
		console.log('Company fail');
		notify('warning', 'Cập nhật thất bại');
	}
};