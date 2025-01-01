import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseInput from '../../components/BaseInput';
import { optionValidate } from '../../helper/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider } from 'antd';
import BaseSelectEdit from '../../components/BaseSelectEdit';
import {
	apiFamilyTreeDetails,
	apiFamilyTreeUpdate
} from '../../apis/familyTree';
import { useDispatch } from 'react-redux';
import BaseTextArea from '../../components/BaseTextArea';
import { IoArrowBack } from 'react-icons/io5';

function FamilyTreeUpdate(props) {
	const { id } = useParams();
	const navigate =useNavigate()
	const [familyTreeDetails, setFamilyTreeDetails] = useState();
	const dispatch = useDispatch();
	const getFamilyTreeDetails = (id) => {
		apiFamilyTreeDetails(id)
			.then((result) => {
				setFamilyTreeDetails(result.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (id) {
			getFamilyTreeDetails(id);
		}
	}, [id]);

	// useEffect(() => {
	// 	if (familyTreeDetails?.id) {
	// 		const payload = [
	// 			{ name: 'Nhân viên', url: '/nhan-vien' },
	// 			{
	// 				name: familyTreeDetails?.firstName + ' ' + familyTreeDetails?.lastName,
	// 				url: '/nhan-vien/' + familyTreeDetails?.id + '/cap-nhat',
	// 			},
	// 		];
	// 		dispatch(changeBreadcrumb(payload));
	// 	}
	// }, [familyTreeDetails]);
	return (
		<div style={{ width: '100%' }}>
			
			<div className='w-full justify-between '>
				<div className='w-5/12 p-5 ml-5 mt-5'>
					<div className='pb-5 text-sky-500'>Cập nhật</div>
					<BaseInput
						apiUpdate={apiFamilyTreeUpdate}
						edit={true}
						field={'name'}
						id={id}
						label={'Tên dự án'}
						value={familyTreeDetails?.name}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseInput
						apiUpdate={apiFamilyTreeUpdate}
						edit={true}
						field={'address'}
						id={id}
						label={'Địa chỉ'}
						value={familyTreeDetails?.address}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseTextArea
						apiUpdate={apiFamilyTreeUpdate}
						edit={true}
						field={'description'}
						id={id}
						label={'Mô tả'}
						value={familyTreeDetails?.description}
						rules={optionValidate(true, null, null, 5, 30, 'tên nhân viên')}
					/>
					<Divider />
					<BaseSelectEdit
						apiUpdate={apiFamilyTreeUpdate}
						id={id}
						edit={true}
						label={'Trạng thái'}
						field={'status'}
						option={[
							{ label: 'Bản nháp', value: 0 },
							{ label: 'Hoạt động', value: 1 },
							{ label: 'Ngừng hoạt động', value: 2 }
						]}
						value={familyTreeDetails?.status}
						rules={optionValidate(true, null, null, null, null, 'trạng thái')}
					/>
					<Divider />
				</div>
			</div>
		</div>
	);
}

FamilyTreeUpdate.propTypes = {};

export default FamilyTreeUpdate;
