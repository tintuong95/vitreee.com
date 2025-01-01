import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {MdModeEditOutline} from 'react-icons/md';
import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import {Controller, useForm} from 'react-hook-form';
import {Button, Form, Input, InputNumber, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {useMitt} from 'react-mitt';
import { openNotification } from '../helper/notification';
import { NOTIFICATION_TYPE } from '../constant';
import { optionValidate } from '../helper/validate';

export default function BaseInput({
	id,
	label,
	value,
	edit = true,
	field,
	apiUpdate,
	rules = [],
	number = false,
}) {
	const [readOnly, setReadOnly] = useState(true);
	const [newValue, setNewValue] = useState(value);
	const [form] = Form.useForm();
	const [modal, contextHolder] = Modal.useModal();
	const {emitter} = useMitt();

	const confirm = () => {
		modal.confirm({
			title: 'Xác nhận',
			icon: <ExclamationCircleOutlined />,
			content: 'Bạn chắc chắn muốn cập nhật !',
			okText: 'Đồng ý',
			onOk: () => {
				fetchUpdate();
			},
		});
	};
	const fetchUpdate = () => {
		emitter.emit('pendingOn');

		const data = {[field]: newValue};
		apiUpdate(id, data)
			.then((result) => {
				setReadOnly(!readOnly);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				setReadOnly(!readOnly);
				// setNewValue(value);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
			})
			.finally(() => {
				emitter.emit('pendingOff');
			});
	};

	useEffect(() => {
		setNewValue(value);
		form.setFieldsValue({[field]: value});
		console.log('validate', optionValidate);
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
				<div className='col-span-3 text-base'>{label} :</div>
				<div className='col-span-6'>
					<Form.Item className='my-0 w-full' name={field} rules={rules}>
						{!number && (
							<Input
								value={newValue}
								onChange={(e) => {
									setNewValue(e.target.value);
								}}
								className='w-full rounded'
								readOnly={readOnly}
							/>
						)}
						{number && (
							<InputNumber
								value={newValue}
								onChange={(e) => {
									setNewValue(e);
								}}
								className='w-full rounded'
								readOnly={readOnly}
							/>
						)}
					</Form.Item>
				</div>
				{edit ? (
					<div className='col-span-3 flex justify-end'>
						{readOnly ? (
							<div className=''>
								<Button
									onClick={() => {
										setReadOnly(!readOnly);
									}}
									type='link'>
									<MdModeEditOutline />
								</Button>
							</div>
						) : (
							''
						)}
						{!readOnly ? (
							<div className=' flex justify-end gap-2'>
								<Button
									htmlType='button'
									onClick={() => {
										setReadOnly(!readOnly);
										setNewValue(value);
										form.setFieldsValue({[field]: value});
									}}
									type=''>
									<AiOutlineClose />
								</Button>
								<Button className='' htmlType='submit' type='link'>
									<AiOutlineSave size={20} />
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
BaseInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	edit: PropTypes.bool,
	field: PropTypes.string,
	apiUpdate: PropTypes.func,
	rules: PropTypes.any,
	number: PropTypes.any,
};