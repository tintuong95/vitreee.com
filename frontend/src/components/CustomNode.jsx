import { Handle, Position } from '@xyflow/react';
import { Avatar, Button } from 'antd';
import React, { memo } from 'react';
import { FaChild } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { LuTrash } from 'react-icons/lu';
import { RiEditBoxLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import CreateMember from '../views/TreeRoot/CreateMember';

const { Top, Bottom, Left, Right } = Position;

export default memo(({ data }) => {
	const { isSpouse, isSibling, label, direction, info } = data;
	const { id } = useParams();

	const isTreeHorizontal = direction === 'LR';

	const getTargetPosition = () => {
		if (isSpouse) {
			return isTreeHorizontal ? Top : Left;
		} else if (isSibling) {
			return isTreeHorizontal ? Bottom : Right;
		}
		return isTreeHorizontal ? Left : Top;
	};

	const isRootNode = data?.isRoot;
	const hasChildren = !!data?.children?.length;
	const hasSiblings = !!data?.siblings?.length;
	const hasSpouses = !!data?.spouses?.length;
	return (
		<div
			// style={{
			// 	borderColor: info?.gender == 0 ? '#7dd3fc' : '#fda4af'
			// }}
			className={
				'bg-white group  border relative active:border-rose-500   border-gray-300  rounded shadow-xs p-2 hover:shadow-lg hover:border-sky-500     transition-all duration-110 ease-in-out'
			}
		>
			{/* For children */}
			{hasChildren && (
				<Handle
					type='source'
					position={isTreeHorizontal ? Right : Bottom}
					id={isTreeHorizontal ? Right : Bottom}
				/>
			)}

			{/* For spouses */}
			{hasSpouses && (
				<Handle
					type='source'
					position={isTreeHorizontal ? Bottom : Right}
					id={isTreeHorizontal ? Bottom : Right}
				/>
			)}

			{/* For siblings */}
			{hasSiblings && (
				<Handle
					type='source'
					position={isTreeHorizontal ? Top : Left}
					id={isTreeHorizontal ? Top : Left}
				/>
			)}

			{/* Target Handle */}
			{!isRootNode && (
				<Handle
					type={'target'}
					position={getTargetPosition()}
					id={getTargetPosition()}
				/>
			)}
			<div className='flex w-full gap-2   relative  '>
				<div className='w-1/5 flex flex-col justify-center items-center gap-1'>
					<Avatar
						shape='circle'
						src={
							'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
						}
					/>
				</div>
				<div className='w-4/5 flex flex-col justify-start items-start text-xs'>
					<div className='font-semibold ' style={{ fontSize: 12 }}>
						{info?.fullName}
					</div>
					<div className='text-gray-500' style={{ fontSize: 9 }}>
						{info?.gender == 1 ? (
							<div className='text-sky-400'>Nam</div>
						) : (
							<div className='text-rose-400'>Nữ</div>
						)}
					</div>
					<div className='text-gray-500' style={{ fontSize: 9 }}>
						{info?.birth_date} | {info?.dead_date}
					</div>
					<div className='text-gray-500' style={{ fontSize: 9 }}>
						{/* {info?.address} */}
						Tây Hòa - Phú Yên
					</div>
				</div>
				{/* <div className='absolute bottom-0 right-0'>
					<DropdownDetail data={info} />
				</div> */}

				<div className='absolute -top-6 left-16 group-hover:block hidden'>
					<Button
						type='default'
						shape='circle'
						size='small'
						icon={<RiEditBoxLine size={10} />}
					/>
				</div>
				<div className='absolute -bottom-6 left-16 group-hover:block hidden'>
					<CreateMember
						type={0}
						familyTreeId={id}
						relationType={'parent'}
						relationId={data?.id}
					>
						{' '}
						<Button
							type='default'
							shape='circle'
							size='small'
							icon={<FaChild size={10} />}
						/>
					</CreateMember>
				</div>
				<div className='absolute top-4 -left-5 group-hover:block hidden'>
					<Button
						type='default'
						shape='circle'
						size='small'
						icon={<LuTrash size={10} />}
					/>
				</div>
				<div className='absolute top-4 -right-5 group-hover:block hidden'>
					<CreateMember
						type={0}
						familyTreeId={id}
						relationType={'couple'}
						relationId={data?.id}
					>
						<Button
							type='default'
							shape='circle'
							size='small'
							icon={<FaHeart size={10} />}
						/>
					</CreateMember>
					{/* <Button
						type='default'
						shape='circle'
						size='small'
						icon={<FaRegHeart size={10} />}
					/> */}
				</div>
			</div>
		</div>
	);
});
