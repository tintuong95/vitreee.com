import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NOTIFICATION_TYPE } from '../../constant';
import { openNotification } from '../../helper/notification';
import { getMessageErrors, optionValidate } from '../../helper/validate';
import { apiCreateFamilyTree } from '../../apis/familyTree';

function FamilyTreeCreate() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const id = useParams();
	const navigate = useNavigate();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = () => {
		fetchFamilyTreeCreate();
	};

	const fetchFamilyTreeCreate = () => {
		const all = form.getFieldsValue();

		apiCreateFamilyTree(all)
			.then((response) => {
				openNotification(NOTIFICATION_TYPE.success, 'Tạo mới thành công !');
			})
			.then((response) => {
				
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !');
				console.log(err);
			});
	};

	useEffect(() => {
		console.log(id);
	}, [id]);

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Tạo mới +
			</Button>
			<Modal
				title='Tạo mới'
				open={isModalOpen}
				onOk={onFinish}
				onCancel={handleCancel}
			>
				<Form
					form={form}
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
						Tên dự án
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('name') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'họ tên')}
						label='Tên dự án'
						name={'name'}
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
						Mô tả
					</label>
					<Form.Item
						noStyle={true}
						validateStatus={form.getFieldError('description') ? '' : 'error'}
						rules={optionValidate(true, null, null, 5, 25, 'Mô tả')}
						label='Mô tả'
						name={'description'}
					>
						<Input.TextArea rows={4} placeholder='Vui lòng nhập' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
export default FamilyTreeCreate;
