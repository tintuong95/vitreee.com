import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, Modal, Select, Space} from 'antd';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';

import {MdModeEditOutline} from 'react-icons/md';
import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import {useMitt} from 'react-mitt';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { NOTIFICATION_TYPE } from '../constant';
import { openNotification } from '../helper/notification';

function BaseSelectEdit({
	label,
	field,

	value,
	option,
	apiUpdate,
	id,
	rules = [],
	edit = true,
}) {
	const [readOnly, setReadOnly] = useState(true);
	const [newValue, setNewValue] = useState(value);
	const [form] = Form.useForm();
	const [modal, contextHolder] = Modal.useModal();
	const {emitter} = useMitt();
	const onFetchUpdate = () => {
		if (newValue == value) return;
		apiUpdate(id, {[field]: newValue})
			.then((result) => {
				setNewValue(newValue);
				setReadOnly(!readOnly);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
				console.log(result);
			})
			.catch((err) => {
				setReadOnly(!readOnly);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
				console.log(err);
			});
	};
	const confirm = () => {
		modal.confirm({
			title: 'Xác nhận',
			icon: <ExclamationCircleOutlined />,
			content: 'Bạn chắc chắn muốn cập nhật !',
			okText: 'Đồng ý',
			onOk: () => {
				onFetchUpdate();
			},
		});
	};
	useEffect(() => {
		console.log(value, option);
		setNewValue(value);
		form.setFieldsValue({[field]: value});
	}, [value]);
	return (
		<>
			{contextHolder}
			<Form
				form={form}
				onFinish={confirm}
				onFinishFailed={(e) => {
					console.log(e);
				}}
				className='grid grid-cols-12 items-center'>
				<div className='col-span-3'>{label} :</div>
				<div className='col-span-6'>
					<Form.Item className='my-0 w-full' name={field} rules={rules}>
						<Select
							name={label}
							value={newValue}
							className='w-full'
							options={option}
							disabled={readOnly}
							onChange={(e) => {
								setNewValue(e);
							}}
						/>
					</Form.Item>
				</div>
				{edit ? (
					<div className='col-span-3 flex justify-end'>
						{readOnly ? (
							<div>
								<Button
									onClick={() => {
										setReadOnly(!readOnly);
									}}
									type='link'>
									<MdModeEditOutline size={20} />
								</Button>
							</div>
						) : (
							''
						)}
						{!readOnly ? (
							<div className=' flex justify-end gap-2'>
								<Button
									onClick={() => {
										setNewValue(value);
										setReadOnly(!readOnly);
									}}
									type=''>
									<AiOutlineClose />
								</Button>
								<Button htmlType='submit' type='link'>
									<AiOutlineSave />
								</Button>
							</div>
						) : (
							''
						)}
					</div>
				) : (
					''
				)}
			</Form>
		</>
	);
}

BaseSelectEdit.propTypes = {
	label: PropTypes.string,
	field: PropTypes.string,
	tooltip: PropTypes.object,
	rules: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	option: PropTypes.array,
	apiUpdate: PropTypes.func,
	id: PropTypes.number,
	edit: PropTypes.bool,
};

export default BaseSelectEdit;