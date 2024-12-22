import React, {useCallback} from 'react';
import {
	Background,
	ReactFlow,
	addEdge,
	ConnectionLineType,
	Panel,
	useNodesState,
	useEdgesState,
	MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {FaGripHorizontal, FaGripVertical} from 'react-icons/fa';

import {initialTree, treeRootId} from './initialElements';
import {layoutElements} from './layout-elements';
import CustomNode from '../../components/CustomNode';
import CustomEdge from '../../components/CustomEdge';
import DownloadButton from '../../components/DownloadButton';

const nodeTypes = {
	custom: CustomNode,
};
const edgeTypes = {
	'custom-edge': CustomEdge,
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
const {nodes: layoutedNodes, edges: layoutedEdges} = layoutElements(
	initialTree,
	treeRootId,
	'TB'
);

const TreeRootPage = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge({...params, type: 'custom-edge', animated: false}, eds)
			),
		[]
	);
	const onLayout = useCallback(
		(direction) => {
			const {nodes: layoutedNodes, edges: layoutedEdges} = layoutElements(
				initialTree,
				treeRootId,
				direction
			);

			setNodes([...layoutedNodes]);
			setEdges([...layoutedEdges]);
		},
		[nodes, edges]
	);
	const snapGrid = [500, 500];
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
				style={{backgroundColor: '#F7F9FB'}}>
				{' '}
				<MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
				<Panel position='top-right '>
          <div className='flex flex-col gap-3 text-xs text-gray-400'>
        	<DownloadButton/>
						<button className='flex gap-2 items-center' onClick={() => onLayout('LR')}>
							<FaGripVertical />Hàng dọc
						</button>
						<button className='flex gap-2 items-center' onClick={() => onLayout('TB')}>
							<FaGripHorizontal />Hàng ngang
						</button>
					</div>
				</Panel>
				<Background bgColor='white' />
			
			</ReactFlow>
		</div>
	);
};

export default TreeRootPage;
