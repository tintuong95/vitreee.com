import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Form, Input, Radio, Select, Upload } from 'antd';
import { getMessageErrors, optionValidate } from '../../helper/validate';
import { apiCreateMember } from '../../apis/member';
import { openNotification } from '../../helper/notification';
import { NOTIFICATION_TYPE } from '../../constant';
import { apiCreateRelation } from '../../apis/relation';
import { useMitt } from 'react-mitt';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

function CreateMember({
	children,
	familyTreeId,
	type = 0,
	relationType,
	relationId
}) {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const { emitter } = useMitt();

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
				openNotification(NOTIFICATION_TYPE.success, 'Tạo mới thành công !');
				if (relationType == 'couple') {
					apiCreateRelation({
						member_first_id: relationId,
						member_second_id: response?.data?.id,
						type: 'couple',
						familyTreeId
					}).t;
				}
				if (relationType == 'parent') {
					apiCreateRelation({
						member_first_id: relationId,
						member_second_id: response?.data?.id,
						type: 'parent',
						familyTreeId
					}).t;
				}
			})
			.then((response) => {
				onClose();
				emitter.emit('reloadTreeMap');
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !');
				console.log(err);
			});
	};
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
		  src = await new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(file.originFileObj);
			reader.onload = () => resolve(reader.result);
		  });
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	  };
	return (
		<div>
			<div onClick={showDrawer}>{children}</div>

			<Drawer width={700} title='Tạo mới thành viên' onClose={onClose} open={open}>
				<Form
					form={form}
					onFinish={onFinish}
					onFinishFailed={() => {
						console.log(getMessageErrors(form.getFieldsError()));
						setErrors(getMessageErrors(form.getFieldsError()));
					}}
					className='grid grid-cols-2  gap-4 gap-x-8 px-5'
				>
					<div className='col-span-2'>
					<ImgCrop rotationSlider>

						<Upload
							name='avatar'
							listType='picture-card'
							className='avatar-uploader'
							showUploadList={false}
							action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
							// beforeUpload={beforeUpload}
							// onChange={handleChange}
						>
							<button
								style={{
									border: 0,
									background: 'none'
								}}
								type='button'
							>
								<PlusOutlined />
								<div
									style={{
										marginTop: 8
									}}
								>
									Upload
								</div>
							</button>
						</Upload></ImgCrop>
					</div>
					<div>
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
							<Input placeholder='Nguyễn Văn A' />
						</Form.Item>
					</div>
					<div>
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
							<Input placeholder='0977.345.678' />
						</Form.Item>
					</div>
					<div>
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
							<Input placeholder='admin@example.com' />
						</Form.Item>
					</div>
					<div>
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
							<Input placeholder='Tam Phước - Đồng Nai' />
						</Form.Item>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block    text-gray-900 dark:text-white mt-2'
						>
							Ngày sinh
						</label>
						<Form.Item
							noStyle={true}
							validateStatus={form.getFieldError('birth_date') ? '' : 'error'}
							rules={optionValidate(true, null, null, 5, 25, 'Sinh nhật')}
							label='Sinh nhật'
							name={'birth_date'}
						>
							<Input placeholder='10/10/1995' />
						</Form.Item>
					</div>
					{/* <div>
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
					</div> */}
					<div>
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
							<Select
								placeholder='Vui lòng chọn'
								className='w-full'
								options={[
									{
										value: 0,
										label: 'Nam'
									},
									{
										value: 1,
										label: 'Nữ'
									}
								]}
							/>
						</Form.Item>
					</div>
					<div className='col-span-2'>
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
							<Input.TextArea rows={6} placeholder='Vui lòng nhập' />
						</Form.Item>
					</div>
					<div className='col-span-2 flex items-center mt-3'>
						<div className='w-1/2'>
							{' '}
							<Radio>Đã mất</Radio>
						</div>
						<div className='w-1/2'>
							<Form.Item
								noStyle={true}
								validateStatus={form.getFieldError('dead_date') ? '' : 'error'}
								rules={optionValidate(true, null, null, 5, 25, 'Địa chỉ')}
								label='Địa chỉ'
								name={'dead_date'}
							>
								<Input placeholder='10/10/2700' />
							</Form.Item>
						</div>
					</div>
					<Button htmlType='submit' className='my-5' type='primary'>
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
	relationId: PropTypes.string,
	children: PropTypes.any
};

export default CreateMember;
