import React, {FC, useCallback} from 'react';
import {EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge, getStraightPath, useStore} from 'reactflow';
import {getEdgeParams} from "@/modules/diagrams/utils/edges";

function EdgeLabel({ transform, label }: { transform: string; label: string }) {
    return <span className={'text-xs absolute'}
            style={{transform}}>
            {label}
        </span>
}
const CustomEdgeStartEnd = (props:EdgeProps) => {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(props.source), [props.source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(props.target), [props.target]));

    let { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    if (sx<tx){
        tx=tx-30
    }else{
        sx=sx-30
    }

    if (sy<ty){
        ty=ty-30
    }else{
        sy=sy-30
    }

    return (
        <>
            <BaseEdge id={props.id} path={edgePath} markerEnd={props.markerEnd} style={{'stroke': '#000000'}}/>
            <EdgeLabelRenderer>
                {props.data.startCardinality && (
                    <EdgeLabel
                        transform={`translate(${sx}px,${sy}px)`}
                        label={props.data.startCardinality}
                    />
                )}
                {props.data.endCardinality && (
                    <EdgeLabel
                        transform={`translate(${tx}px,${ty}px)`}
                        label={props.data.endCardinality}
                    />
                )}
                {props.data.label && (
                    <EdgeLabel
                        transform={`translate(${(sx+tx)/2}px,${(sy+ty)/2}px)`}
                        label={props.data.label}
                    />
                )}
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdgeStartEnd;
