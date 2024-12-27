import {
	BaseEdge,
	EdgeLabelRenderer,
	getBezierPath,
	getSmoothStepPath,
	getStraightPath,
	useReactFlow
} from '@xyflow/react';
import { getDefaultLibFilePath } from 'typescript';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY
	});

	return (
		<BaseEdge
			style={{
				stroke: '#d4d4d8'
			}}
			id={id}
			path={edgePath}
		/>
	);
}
