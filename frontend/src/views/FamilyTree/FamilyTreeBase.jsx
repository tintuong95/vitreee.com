import React, { useEffect, useState } from 'react';
import {
	Button,
	Dropdown,
	Image,
	Input,
	Modal,
	Pagination,
	Space,
	Table,
	Tag
} from 'antd';
import { GrPowerReset } from 'react-icons/gr';
import { AiOutlineHolder } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useMitt } from 'react-mitt';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import CreateTreeBaseModal from './CreateTreeBaseModal';
import {
	apiFamilyTreeRemove,
	apiGetListFamilyTree
} from '../../apis/familyTree';
import { openNotification } from '../../helper/notification';
import { NOTIFICATION_TYPE } from '../../constant';

const initial = {
	currentPage: 1,
	perPage: 10,
	name: null,
	idCard: null
};
const filter = {
	name: '',
	lastName: ''
};
const items = (data) => [
	{
		key: '1',
		label: (
			<Link to='/tree' rel='noopener noreferrer'>
				Chi tiết
			</Link>
		)
	},
	{
		key: '2',
		label: (
			<Link to='/familyTree/update' rel='noopener noreferrer'>
				Cập nhật
			</Link>
		)
	},

	{
		key: '4',
		danger: true,

		label: (
			<div aria-hidden style={{ width: 200 }}>
				Xóa bỏ
			</div>
		)
	}
];
const columns = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		render: (text, _, index) => <a>{++index}</a>
	},
	{
		title: 'Hình ảnh',
		dataIndex: 'cover_image_url',
		key: 'cover_image_url',
		render: (text, _, index) => (
			<Image
				preview={false}
				width={90}
				className='rounded-md shadow-md'
				src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
			/>
		)
	},
	{
		title: 'Tên dự án',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>
	},
	{
		title: 'Thành viên',
		dataIndex: 'member',
		key: 'member',
		render: (text) => <a>{1000}</a>
	},
	{
		title: 'Địa chỉ',
		dataIndex: 'address',
		key: 'address',
		render: (text) => <a>{text}</a>
	},
	{
		title: 'Trạng thái',
		key: 'status',
		dataIndex: 'status',
		render: (text) => {
			console.log('text', text);
			if (text == 0) {
				return (
					<Tag className='py-1 px-4 uppercase' color='gray'>
						Bản nháp
					</Tag>
				);
			}
			if (text == 1) {
				return (
					<Tag className='py-1 px-4 uppercase' color='blue'>
						Hoạt động
					</Tag>
				);
			}
			return (
				<Tag className='py-1 px-4 uppercase' color='red'>
					Đang khóa
				</Tag>
			);
		}
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (_, record) => (
			<>
				<div>{moment(record.createdAt).format('HH:mm DD/MM/YYYY')}</div>
				<small className='text-gray-300'>
					{moment(record.updatedAt).format('HH:mm DD/MM/YYYY')}
				</small>
			</>
		)
	},
	{
		title: 'Thao tác',
		key: 'action',

		render: (_, record) => (
			<Dropdown
				className='w-48'
				menu={{
					items: items(record)
				}}
			>
				<a className='text-sky-600 ' href='#sda' onClick={(e) => e.preventDefault()}>
					<Space>
						<AiOutlineHolder />
					</Space>
				</a>
			</Dropdown>
		)
	}
];

function FamilyTreeBase() {
	const [paramList, setParamList] = useState(initial);
	const [familyTreeList, setFamilyTreeList] = useState([]);
	const [modal, contextHolder] = Modal.useModal();
	const { emitter } = useMitt();
	const dispatch = useDispatch();
	const confirm = (id) => {
		console.log('Confirmed');
		modal.confirm({
			title: 'Xác nhận',
			icon: <ExclamationCircleOutlined />,
			content: 'Bạn chắc chắn muốn xóa !',
			okText: 'Đồng ý',
			onOk: () => onRemove(id)
		});
	};

	const onRemove = (id) => {
		apiFamilyTreeRemove(id)
			.then((_) => openNotification(NOTIFICATION_TYPE.success, 'Xóa thành công !'))
			.then((_) => getListFamilyTree())
			.catch((err) => openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !'));
	};
	const getListFamilyTree = () => {
		emitter.emit('pendingOn');
		apiGetListFamilyTree(paramList)
			.then((response) => {
				setFamilyTreeList(response.data?.list);

				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				emitter.emit('pendingOff');
			});
	};
	// const onSearch = handleSubmit((data) => {
	// 	setParamList(
	// 		_.omitBy({...initial, ...data}, (value) => value === null || value === '')
	// 	);
	// });
	useEffect(() => {
		getListFamilyTree();
	}, [paramList]);
	return (
		<>
			<div className='flex justify-between my-6 mx-4'>
				<div>
					<CreateTreeBaseModal />
				</div>
				<div>
					<div className='flex items-center gap-2'>
						<Input placeholder='Nhập Họ Tên' style={{ width: 200 }} />
						<Button className='' type='default'>
							<GrPowerReset />
						</Button>
						<Button type='primary'>Tìm kiếm</Button>
					</div>
				</div>
			</div>
			<Table columns={columns} dataSource={familyTreeList} pagination={false} />
			<div className='mt-5 flex justify-end mx-3'>
				{' '}
				<Pagination
					defaultCurrent={paramList?.currentPage}
					total={paramList?.perPage}
				/>
			</div>
		</>
	);
}
export default FamilyTreeBase;
