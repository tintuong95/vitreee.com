import React, { useCallback, useEffect, useState } from 'react';
import {
	Background,
	ReactFlow,
	addEdge,
	ConnectionLineType,
	Panel,
	useNodesState,
	useEdgesState,
	MiniMap
} from '@xyflow/react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';

import '@xyflow/react/dist/style.css';
import { FaChild, FaGripHorizontal, FaGripVertical } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

import { initialTree, treeRootId } from './initialElements';
import { layoutElements } from './layout-elements';
import CustomNode from '../../components/CustomNode';
import CustomEdge from '../../components/CustomEdge';
import DownloadButton from '../../components/DownloadButton';
import { Button, FloatButton } from 'antd';
import CreateMember from './CreateMember';
import { useParams } from 'react-router-dom';
import { apiGetListMember } from '../../apis/member';
import { useMitt } from 'react-mitt';
import _ from 'lodash';
import { apiGetListRelation } from '../../apis/relation';
import { RiEditBoxLine } from 'react-icons/ri';
import { LuTrash } from 'react-icons/lu';

const nodeTypes = {
	custom: CustomNode
};
const edgeTypes = {
	'custom-edge': CustomEdge
};

const nodeColor = (node) => {
	switch (node.type) {
		case 'input':
			return '#6ede87';
		case 'output':
			return '#6865A5';
		default:
			return '#ff0072';
	}
};
const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
	initialTree,
	treeRootId,
	'TB'
);
const initial = {
	currentPage: 1,
	perPage: 100000
};
const TreeRootPage = () => {
	const [paramList, setParamList] = useState(initial);
	const [memberList, setMemberList] = useState([]);
	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
	const { id } = useParams();
	const { emitter } = useMitt();
	const fetchDataAndApplyLayout = useCallback(async () => {
		try {
			const responseMembers = await apiGetListMember({
				currentPage: 1,
				perPage: 100000
			});
			const members = responseMembers.data?.list || [];
			const responseRelation = await apiGetListRelation({
				currentPage: 1,
				perPage: 100000
			});
			const relations = responseRelation.data?.list || [];

			const updatedMembers = members.map((member) => {
				const children = [];
				const siblings = [];
				const spouses = [];
				let isSpouse = false;

				relations.forEach((rel) => {
					// Nếu là member_first_id
					if (rel.member_first_id === member.id) {
						if (rel.type === 'couple') {
							spouses.push(rel.member_second_id);
						}
					}

					// Nếu là member_second_id
					if (rel.member_second_id === member.id) {
						if (rel.type === 'couple') {
							isSpouse = true;
						}
					}
				});

				// Tạo đối tượng kết quả
				const result = {
					...member,
					...(children.length > 0 && { children }),
					...(siblings.length > 0 && { siblings }),
					...(spouses.length > 0 && { spouses }),
					...(isSpouse && { isSpouse })
				};

				return result;
			});

			const newData = _.map(updatedMembers, (item) => {
				let temp = {};
				temp.id = item?.id;
				temp.info = item;
				item?.spouses ? (temp.spouses = item?.spouses) : null;
				item?.isSpouse ? (temp.isSpouse = item?.isSpouse) : null;
				if (item?.type == 1) {
					item.type = 'input';
				}
				return temp;
			});
			const result = newData.reduce((acc, item, index) => {
				acc[index + 1] = item;
				return acc;
			}, {});
			console.log('result', _.find(members, (item) => item?.type == 1)?.id, result);

			//   Áp dụng layout
			const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
				initialTree, ///transformedNodes
				treeRootId,
				'TB'
			);
			setNodes(layoutedNodes);
			setEdges(layoutedEdges);
		} catch (error) {
			console.error('Error fetching members:', error);
		}
	}, []);
	useEffect(() => {
		fetchDataAndApplyLayout();
	}, [fetchDataAndApplyLayout]);

	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge({ ...params, type: 'custom-edge', animated: false }, eds)
			),
		[]
	);

	const snapGrid = [5000000, 5000000];

	const findRelation = (id, relations) => {
		let temp = {
			children: [],
			spouses: []
		};
		const findChildren = _.filter(relations, (item) => {
			return item?.member_first_id == id && item?.type == 'children';
		});
		temp.children = _.map(findChildren, (item) => item?.member_second_id);
		const findSpouses = _.filter(relations, (item) => {
			return item?.member_first_id == id && item?.type == 'couple';
		});

		temp.spouses = _.map(findSpouses, (item) => item?.member_second_id);
		return temp;
	};
	const memberRender = (data, dataRelation) => {
		const newList = _.map(data, (item) => {
			if (item?.type == 1) {
				return {
					id: item?.id,
					info: {
						id: item?.id,
						fullName: item?.fullName,
						phone: item?.phone,
						email: item?.email,
						address: item?.address,
						avatar: item?.avatar,
						description: item?.description,
						birth_date: item?.birth_date,
						dead_date: item?.dead_date,
						gender: item?.gender,
						type: item?.type
					},
					type: 'input'
					// spouses:item?.spouses,
					// children:item?.children
				};
			} else {
				return {
					id: item?.id,
					info: {
						id: item?.id,
						fullName: item?.fullName,
						phone: item?.phone,
						email: item?.email,
						address: item?.address,
						avatar: item?.avatar,
						description: item?.description,
						birth_date: item?.birth_date,
						dead_date: item?.dead_date,
						gender: item?.gender
						// spouses:item?.spouses,
						// children:item?.children
					}
				};
			}
		});
		const temp = _.map(newList, (item) => {
			console.log(item?.info?.id, item, findRelation(item?.info?.id, dataRelation));

			const newData = {
				...item
				// ...findRelation(item?.info?.id,dataRelation)
			};

			return newData;
		});
		// const newNewData=_.map(temp,(item)=>{
		// 	if(_.findIndex(dataRelation,o=>o?.member_second_id==item?.info?.id))
		// 	{
		// 		return {...item,isSpouse:true}
		// 	}
		// })
		console.log('temp', temp);
		return temp;
	};

	// useEffect(() => {
	// 	getListMember();
	// }, [paramList]);

	// useEffect(() => {
	// 	memberRender(memberList);
	// }, [memberList]);
	return (
		<div className='h-screen w-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				connectionLineType={ConnectionLineType.Bezier}
				fitView
				snapGrid={snapGrid}
				edgeTypes={edgeTypes}
				nodeTypes={nodeTypes}
				style={{ backgroundColor: '#F7F9FB' }}
			>
				{' '}
				<MiniMap
					nodeColor={nodeColor}
					nodeStrokeWidth={3}
					position='bottom-left'
					zoomable
					pannable
				/>
				<Panel position='top-right '>
					<div className='flex flex-col gap-3 text-xs text-gray-400'>
						<DownloadButton />
						<button className='flex gap-2 items-center' onClick={() => onLayout('LR')}>
							<FaGripVertical />
							Hàng dọc
						</button>
						<button className='flex gap-2 items-center' onClick={() => onLayout('TB')}>
							<FaGripHorizontal />
							Hàng ngang
						</button>
					</div>
				</Panel>
				<Panel position='top-left '>
					<div className='flex flex-col gap-3 text-xs text-gray-400'>
						<CreateMember type={1} familyTreeId={id} />
					</div>
				</Panel>
				<Background bgColor='white' />
			</ReactFlow>
			<FloatButton.Group placement='top' shape='circle'>
				<FloatButton tooltip={<div>Thêm vợ chồng </div>} icon={<FaRegHeart />} />
				<FloatButton tooltip={<div>Thêm con cái </div>} icon={<FaChild />} />
				<FloatButton tooltip={<div>Cập nhật </div>} icon={<RiEditBoxLine />} />
				<FloatButton tooltip={<div>Xóa bỏ </div>} icon={<LuTrash />} />
				<FloatButton.BackTop visibilityHeight={0} />
			</FloatButton.Group>
		</div>
	);
};

export default TreeRootPage;
