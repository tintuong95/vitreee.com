import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from '../../components/BaseInput';
import { optionValidate } from '../../helper/validate';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import BaseSelectEdit from '../../components/BaseSelectEdit';

function FamilyTreeUpdate(props) {
	const { id } = useParams();
	return (
		<div style={{ width: '100%' }}>
			<div className='w-full justify-between '>
				<div className='w-5/12 p-5 ml-5 mt-5'>
					<BaseInput
						// apiUpdate={apiUpdateEmployee}
						edit={true}
						field={'name'}
						id={id}
						label={'Tên dự án'}
						// value={employeeDetails?.fullName}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseInput
						// apiUpdate={apiUpdateEmployee}
						edit={true}
						field={'address'}
						id={id}
						label={'Địa chỉ'}
						// value={employeeDetails?.fullName}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseInput
						// apiUpdate={apiUpdateEmployee}
						edit={true}
						field={'description'}
						id={id}
						label={'Mô tả'}
						// value={employeeDetails?.fullName}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseSelectEdit
						// apiUpdate={apiUpdateEmployee}
						id={id}
						edit={true}
						label={'Trạng thái'}
						field={'gender'}
						option={[
							{label: 'Bản nháp', value: 0},
							{label: 'Hoạt động', value: 1},
							{label: 'Ngừng hoạt động', value: 2},
						]}
						// value={employeeDetails?.gender}
						rules={optionValidate(true, null, null, null, null, 'giới tính')}
					/>
					<Divider />
					
				</div>
			</div>
		</div>
	);
}

FamilyTreeUpdate.propTypes = {};

export default FamilyTreeUpdate;
