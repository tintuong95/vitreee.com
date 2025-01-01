import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, Space} from 'antd';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';

import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import {MdModeEditOutline} from 'react-icons/md';
import { openNotification } from '../helper/notification';
import { NOTIFICATION_TYPE } from '../constant';

function BaseTextArea({id, label, value, edit = true, field, apiUpdate}) {
	const [readOnly, setReadOnly] = useState(true);
	const [newValue, setNewValue] = useState(value);

	const onChange = (e) => {
		setNewValue(e.target.value);
	};

	const fetchUpdate = () => {
		const data = {[field]: newValue};
		apiUpdate(id, data)
			.then((result) => {
				setReadOnly(!readOnly);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				setReadOnly(!readOnly);
				setNewValue(value);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
			});
	};

	useEffect(() => {
		setNewValue(value);
	}, [value]);
	return (
		<div className='grid grid-cols-12 items-center'>
			<div className='col-span-3 '>{label} :</div>
			<div className='col-span-6'>
				<Input.TextArea
                rows={5}
					onChange={onChange}
					className='w-full rounded'
					value={newValue}
					readOnly={readOnly}
				/>
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
								onClick={() => {
									setNewValue(value);
									setReadOnly(!readOnly);
								}}
								type='link'>
								<AiOutlineClose />
							</Button>
							<Button onClick={fetchUpdate} type='link'>
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
		</div>
	);
}

BaseTextArea.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	edit: PropTypes.bool,
	field: PropTypes.string,
	apiUpdate: PropTypes.func,
};

export default BaseTextArea;