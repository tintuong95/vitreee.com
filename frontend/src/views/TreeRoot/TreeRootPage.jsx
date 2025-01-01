import {
	addEdge,
	Background,
	ConnectionLineType,
	MiniMap,
	Panel,
	ReactFlow,
	useEdgesState,
	useNodesState
} from '@xyflow/react';
import React, { useCallback, useEffect } from 'react';

import '@xyflow/react/dist/style.css';
import { FaGripHorizontal, FaGripVertical } from 'react-icons/fa';

import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { apiGetListMember } from '../../apis/member';
import { apiGetListRelation } from '../../apis/relation';
import CustomEdge from '../../components/CustomEdge';
import CustomNode from '../../components/CustomNode';
import DownloadButton from '../../components/DownloadButton';
import CreateMember from './CreateMember';
import { layoutElements } from './layout-elements';
import { useMitt } from 'react-mitt';
import { Button } from 'antd';

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

const TreeRootPage = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const { id } = useParams();
	const { emitter } = useMitt();
	const fetchData = async () => {
		const response = await Promise.all([
			apiGetListMember({
				currentPage: 1,
				perPage: 100000,
				familyTreeId: id
			}),
			apiGetListRelation({
				currentPage: 1,
				perPage: 100000,
				familyTreeId: id
			})
		]);
		return response;
	};
	const applyLayout = async (members, relations) => {
		if (!members) return;
		const updatedMembers = members.map((member) => {
			const children = [];
			const siblings = [];
			const spouses = [];
			let isSpouse = false;

			relations.forEach((rel) => {
				// Nếu là member_first_id
				if (rel.member_first_id === member.id) {
					if (rel.type === 'couple') {
						spouses.push(String(rel.member_second_id));
					}
				}

				// Nếu là member_second_id
				if (rel.member_second_id === member.id) {
					if (rel.type === 'couple') {
						isSpouse = true;
					}
				}
				// Nếu là member_first_id
				if (rel.member_first_id === member.id) {
					if (rel.type === 'parent') {
						children.push(String(rel.member_second_id));
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

			temp.id = String(item?.id);
			temp.info = item;
			item?.spouses ? (temp.spouses = item?.spouses) : null;
			item?.isSpouse ? (temp.isSpouse = item?.isSpouse) : null;
			item?.children ? (temp.children = item?.children) : null;

			if (item?.type == 1) {
				temp.type = 'input';
			}
			return temp;
		});

		const result = newData.reduce((acc, item, index) => {
			acc[item?.id] = item;
			return acc;
		}, {});
		//   Áp dụng layout
		const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
			result, ///transformedNodes
			_.find(members, (item) => item?.type == 1)?.id, //id root
			'TB'
		);
		setNodes(layoutedNodes);
		setEdges(layoutedEdges);
	};

	function refeshFamilyTree() {
		fetchData().then((result) =>
			applyLayout(result[0]?.data?.list, result[1]?.data?.list)
		);
	}
	useEffect(() => {
		refeshFamilyTree();
	}, []);

	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge({ ...params, type: 'custom-edge', animated: false }, eds)
			),
		[]
	);

	useEffect(() => {
		// listen and respond to 'foo' events
		emitter.on('reloadTreeMap', (e) => refeshFamilyTree());
	}, []);
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
						<CreateMember type={1} familyTreeId={id}>
							<Button type='primary'>Tạo mới +</Button>
						</CreateMember>
					</div>
				</Panel>
				<Background bgColor='white' />
			</ReactFlow>
		</div>
	);
};

export default TreeRootPage;
