import React, {useState} from 'react';
import {Button, Input, Modal, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const props = {
	name: 'file',
	action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

const CreateTreeBaseModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
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
				onCancel={handleCancel}>
				<div className='flex flex-col gap-3'>
					<div>
						<label>Tên dự án</label>
						<Input placeholder='Vui lòng nhập' />
					</div>

					<div>
						<label>Địa chỉ</label>
						<Input placeholder='Basic usage' />
					</div>
					<div className='flex flex-col gap-2'>
						<label>Hình ảnh</label>
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>Click to Upload</Button>
						</Upload>
					</div>
					<div>
						<label>Mô tả</label>
						<Input.TextArea rows={5} placeholder='Basic usage' />
					</div>
				</div>
			</Modal>
		</>
	);
};
export default CreateTreeBaseModal;
