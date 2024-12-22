import React from 'react';
import {
	Button,
	Dropdown,
	Image,
	Input,
	Pagination,
	Space,
	Table,
	Tag,
} from 'antd';
import {GrPowerReset} from 'react-icons/gr';
import {AiOutlineHolder} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import FamilyTreeBase from '../FamilyTree/FamilyTreeBase';

const items = (data) => [
	{
		key: '1',
		label: (
			<Link to={`/tree`} rel='noopener noreferrer'>
				Chi tiết
			</Link>
		),
	},
	{
		key: '2',
		label: (
			<Link to={`/employee/update`} rel='noopener noreferrer'>
				Cập nhật
			</Link>
		),
	},

	{
		key: '4',
		danger: true,

		label: (
			<div aria-hidden style={{width: 200}}>
				Xóa bỏ
			</div>
		),
	},
];
const columns = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		render: (text, _, index) => <a>{++index}</a>,
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
		),
	},
	{
		title: 'Tên dự án',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{'Họ Nguyễn'}</a>,
	},
	{
		title: 'Thành viên',
		dataIndex: 'member',
		key: 'member',
		render: (text) => <a>{1000}</a>,
	},
	{
		title: 'Địa chỉ',
		dataIndex: 'address',
		key: 'address',
		render: (text) => <a>{'Tam Phước - Biên Hòa- Đồng Nai'}</a>,
	},
	{
		title: 'Trạng thái',
		key: 'status',
		dataIndex: 'status',
		render: (_) => (
			<Tag className='py-1 px-4 uppercase' color={'blue'}>
				{'Hoạt động'}
			</Tag>
		),
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (_, record) => (
			<>
				<div>{'10:09 10/09/1995'}</div>
				<small className='text-gray-300'>10:09 10/09/1995</small>
			</>
		),
	},
	{
		title: 'Thao tác',
		key: 'action',

		render: (_, record) => (
			<Dropdown
				className='w-48'
				menu={{
					items: items(record),
				}}>
				<a
					className='text-sky-600 '
					href='#sda'
					onClick={(e) => e.preventDefault()}>
					<Space>
						<AiOutlineHolder />
					</Space>
				</a>
			</Dropdown>
		),
	},
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];
const HomePage = () => (
	<>
		<div className='flex justify-between my-6 mx-4'>
			<div>
				<FamilyTreeBase />
			</div>
			<div>
				<div className='flex items-center gap-2'>
					<Input placeholder='Nhập Họ Tên' style={{width: 200}} />
					<Button className='' type='default'>
						<GrPowerReset />
					</Button>
					<Button type='primary'>Tìm kiếm</Button>
				</div>
			</div>
		</div>
		<Table columns={columns} dataSource={data} pagination={false} />
		<div className='mt-5 flex justify-end mx-3'>
			{' '}
			<Pagination defaultCurrent={6} total={500} />
		</div>
	</>
);
export default HomePage;
