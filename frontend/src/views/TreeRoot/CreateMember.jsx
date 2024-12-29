import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Form, Input } from 'antd';
import { optionValidate } from '../../helper/validate';
import { apiCreateMember } from '../../apis/member';
import { openNotification } from '../../helper/notification';
import { NOTIFICATION_TYPE } from '../../constant';
import { apiCreateRelation } from '../../apis/relation';

function CreateMember({ familyTreeId, type = 0, relationType, relationId }) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onFinish = () => {
		fetchMemberCreate({ type, familyTreeId, ...form.getFieldsValue() });
	};
	const fetchMemberCreate = (data) => {
		apiCreateMember(data)
			.then((response) => {
				console.log("response",relationId)
				openNotification(NOTIFICATION_TYPE.success, 'Tạo mới thành công !');
				if (relationType=="couple") {
					apiCreateRelation({
						member_first_id: relationId,
						member_second_id: response?.data?.id,
						type: 'couple'
					}).t
				}
			
			})
			.then((response) => {
			
			
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !');
				console.log(err);
			});
	
	};

	return (
		<div>
			<Button onClick={showDrawer} type='primary'>
				Tạo mới +
			</Button>
			<Drawer title='Basic Drawer' onClose={onClose} open={open}>
				<Form
					form={form}
					onFinish={onFinish}
					onFinishFailed={() => {
						console.log(getMessageErrors(form.getFieldsError()));
						setErrors(getMessageErrors(form.getFieldsError()));
					}}
					className='flex flex-col gap-3'
				>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Họ Tên
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('fullName') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'họ tên')}
						label='Họ Tên'
						name={'fullName'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Số điện thoại
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('phone') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Số điện thoại')}
						label='Số điện thoại'
						name={'phone'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Email
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('email') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Email')}
						label='Email'
						name={'email'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Địa chỉ
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('address') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Địa chỉ')}
						label='Địa chỉ'
						name={'address'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Hình đại diện
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('avatar') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Hình đại diện')}
						label='Hình đại diện'
						name={'avatar'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Tiểu sử
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('description') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Tiểu sử')}
						label='Tiểu sử'
						name={'description'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Sinh nhật
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('birth_date') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Sinh nhật')}
						label='Sinh nhật'
						name={'birth_date'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Ngày mất
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('dead_date') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Ngày mất')}
						label='Ngày mất'
						name={'dead_date'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<label
						htmlFor='password'
						className='block    text-gray-900 dark:text-white mt-2'
					>
						Giới tính
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('gender') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Giới tính')}
						label='Giới tính'
						name={'gender'}
					>
						<Input placeholder='Vui lòng nhập' />
					</Form.Item>
					<Button onClick={onFinish} className='my-5' type='primary'>
						Xác nhận
					</Button>
				</Form>
			</Drawer>
		</div>
	);
}

CreateMember.propTypes = {
	familyTreeId: PropTypes.string,
	type: PropTypes.number,
	relationType: PropTypes.string,
	relationId: PropTypes.string
};

export default CreateMember;
