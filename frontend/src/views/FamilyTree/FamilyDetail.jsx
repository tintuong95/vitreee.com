import PropTypes from 'prop-types';
import { Descriptions, Input } from 'antd';
import { Flex, Splitter, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const items = [
	{
		key: '1',
		label: 'Tên',
		children: 'Họ Nguyễn'
	},
	{
		key: '2',
		label: 'Địa chỉ',
		children: 'Phú Thứ - Tây Hòa - Phú Yên'
	},
	{
		key: '4',
		label: 'Thành viên',
		children: '120'
	},
	{
		key: '3',
		label: 'Mô tả',
		children: (
			<div className='w-1/3'>
				Phú Thứ - Tây Hòa - Phú Yên Phú Thứ - Tây Hòa - Phú Yên Phú Thứ - Tây Hòa - Phú
				Yên Phú Thứ - Tây Hòa - Phú Yên Phú Thứ - Tây Hòa - Phú Yên Phú Thứ - Tây Hòa -
				Phú Yên
			</div>
		)
	},

	{
		key: '5',
		label: 'Ngày tạo',
		children: '10:10 20/10/2024'
	}
];

function FamilyDetail(props) {
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				setInitLoading(false);
				setData(res.results);
				setList(res.results);
			});
	}, []);
	const onLoadMore = () => {
		setLoading(true);
		setList(
			data.concat(
				[...new Array(count)].map(() => ({
					loading: true,
					name: {},
					picture: {}
				}))
			)
		);
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				const newData = data.concat(res.results);
				setData(newData);
				setList(newData);
				setLoading(false);
				// Resetting window's offsetTop so as to display react-virtualized demo underfloor.
				// In real scene, you can using public method of react-virtualized:
				// https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
				window.dispatchEvent(new Event('resize'));
			});
	};
	const loadMore =
		!initLoading && !loading ? (
			<div
				style={{
					textAlign: 'center',
					marginTop: 12,
					height: 32,
					lineHeight: '32px'
				}}
			>
				<Button onClick={onLoadMore}>loading more</Button>
			</div>
		) : null;
	return (
		<div className='px-10 py-8 w-full'>
			<div className='flex w-full gap-6 divide-x'>
				<div className='w-1/4 h-screen '>
					<div className='flex justify-end'>
						{' '}
						<Input
							size='small'
							className='mb-4 flex '
							placeholder='Nhập tên'
							style={{ width: 150 }}
						/>
					</div>{' '}
					<List
						className='demo-loadmore-list'
						loading={initLoading}
						itemLayout='horizontal'
						loadMore={loadMore}
						dataSource={list}
						renderItem={(item) => (
							<List.Item
								actions={[
									<a key='list-loadmore-edit'>edit</a>,
								]}
							>
								<Skeleton avatar title={false} loading={item.loading} active>
									<List.Item.Meta
										avatar={<Avatar src={item.picture.large} />}
										title={<a href='https://ant.design'>{item.name?.last}</a>}
										description='Ant Design, a design language for background applications.'
									/>
								</Skeleton>
							</List.Item>
						)}
					/>
				</div>
				<div className='w-3/4 px-7'>
					<Descriptions column={1} title='User Info' items={items} />
				</div>
			</div>
		</div>
	);
}

FamilyDetail.propTypes = {};

export default FamilyDetail;
