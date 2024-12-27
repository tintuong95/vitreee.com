import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_TYPE } from '../../constant';
import { openNotification } from '../../helper/notification';
import { getMessageErrors } from '../../helper/validate';

function CreateTreeBaseModal() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = () => {
		console.log(form.getFieldsValue());
		fetchEmployeeCreate();
	};

	const fetchEmployeeCreate = () => {
		const all = form.getFieldsValue();

		apiCreateEmployee(data)
			.then((response) => {
				openNotification(NOTIFICATION_TYPE.success, 'Tạo mới thành công !');
			})
			.then((response) => {
				navigate('/employee');
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !');
				console.log(err);
			});
	};
	return (
		<>
			<Button type='primary' onClick={showModal}>
				Tạo mới +
			</Button>
			<Modal
				title='Tạo mới'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form
					form={form}
					onFinish={onFinish}
					onFinishFailed={() => {
						console.log(getMessageErrors(form.getFieldsError()));
						setErrors(getMessageErrors(form.getFieldsError()));
					}}
					className='flex flex-col gap-3'
				>
					<div>
						<label>Tên dự án</label>
						<Input placeholder='Vui lòng nhập' />
					</div>

					<div>
						<label>Địa chỉ</label>
						<Input placeholder='Basic usage' />
					</div>

					<div>
						<label>Mô tả</label>
						<Input.TextArea rows={5} placeholder='Basic usage' />
					</div>
				</Form>
			</Modal>
		</>
	);
}
export default CreateTreeBaseModal;
