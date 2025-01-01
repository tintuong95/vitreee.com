import React, { useEffect, useState } from 'react';
import {
	Avatar,
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
import { Link, useNavigate } from 'react-router-dom';
import { useMitt } from 'react-mitt';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import CreateTreeBaseModal from './FamilyTreeCreate';
import {
	apiFamilyTreeRemove,
	apiGetListFamilyTree
} from '../../apis/familyTree';
import { openNotification } from '../../helper/notification';
import { NOTIFICATION_TYPE } from '../../constant';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';

const initial = {
	currentPage: 1,
	perPage: 10,
	name: null,
};


function FamilyTreeBase() {
	const [paramList, setParamList] = useState(initial);
	const [familyTreeList, setFamilyTreeList] = useState([]);
	const navigate = useNavigate();
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
	const items = (data) => [
		{
			key: '1',
			label: (
				<Link to={'/project/' + data?.id + '/visual'} rel='noopener noreferrer'>
					Chi tiết
				</Link>
			)
		},
		{
			key: '3',
			label: (
				<Link to={'/project/' + data?.id + '/details'} rel='noopener noreferrer'>
					Giới thiệu
				</Link>
			)
		},
		{
			key: '2',
			label: (
				<Link to={`/project/${data?.id}/update`} rel='noopener noreferrer'>
					Cập nhật
				</Link>
			)
		},

		{
			key: '4',
			danger: true,

			label: (
				<div onClick={() => confirm(data?.id)} aria-hidden style={{ width: 180 }}>
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
				<Avatar size={37} icon={<MdOutlineFamilyRestroom />} />
			)
		},
		{
			title: 'Tên dự án',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>
		},
		// {
		// 	title: 'Thành viên',
		// 	dataIndex: 'member',
		// 	key: 'member',
		// 	render: (text) => <a>{1000}</a>
		// },
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
				if (text == 0) {
					return (
						<Tag className='py-0.5  uppercase w-28 text-center' color='gray'>
							Bản nháp
						</Tag>
					);
				}
				if (text == 1) {
					return (
						<Tag className='py-0.5  uppercase w-28 text-center' color='blue'>
							Hoạt động
						</Tag>
					);
				}
				return (
					<Tag className='py-0.5  uppercase w-28 text-center' color='red'>
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
	const onRemove = (id) => {
		apiFamilyTreeRemove(id)
			.then((_) => openNotification(NOTIFICATION_TYPE.success, 'Xóa thành công !'))
			.then((_) => getListFamilyTree(paramList))
			.catch((err) => openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !'));
	};
	const getListFamilyTree = (paramList) => {
		emitter.emit('pendingOn');
		apiGetListFamilyTree(paramList)
			.then((response) => {
				setFamilyTreeList(response.data);

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
	}, []);
	return (
		<>
			<div className='flex justify-between my-6 mx-4'>
				{contextHolder}
				<div>
					<CreateTreeBaseModal
						paramList={paramList}
						getListFamilyTree={getListFamilyTree}
					/>
				</div>
				<div>
					<div className='flex items-center gap-2'>
						<Input
							onChange={(e) => {
								setParamList({ ...paramList, name: e.target.value });
							}}
							value={paramList?.name}
							placeholder='Nhập tên cần tìm'
							style={{ width: 200 }}
						/>
						<Button
							onClick={() => {
								setParamList(initial);
							}}
							className=''
							type='default'
						>
							<GrPowerReset />
						</Button>
						<Button
							onClick={() => {
								getListFamilyTree(paramList);
							}}
							type='primary'
						>
							Tìm kiếm
						</Button>
					</div>
				</div>
			</div>
			<Table columns={columns} dataSource={familyTreeList?.data} pagination={false} />
			<div className='mt-5 flex justify-end mx-3'>
				{' '}
				<Pagination
					defaultCurrent={familyTreeList?.meta?.total}
					total={familyTreeList?.meta?.currentPage}
				/>
			</div>
		</>
	);
}
export default FamilyTreeBase;
