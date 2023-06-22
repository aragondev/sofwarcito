import React, {useCallback, useState} from 'react';
import { toPng } from "html-to-image";

import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant, Panel, useReactFlow, ReactFlowProvider, ControlButton
} from 'reactflow';

import TableNode from '../../../modules/diagrams/components/TableNode';
import Edge from '../../../modules/diagrams/components/Edge';

import 'reactflow/dist/style.css';
import DiagramLayout from "@/modules/diagrams/components/DiagramLayout";
import {Diagram} from "@/modules/diagrams/components/Diagram";
import AppLayout from "@/common/components/layouts/AppLayout";

export default function Id(props: any) {
    return <ReactFlowProvider>
        <Diagram/>
    </ReactFlowProvider>
}


Id.getLayout = function getLayout(page) {
    return (
        <AppLayout background={'white'} >
            {page}
        </AppLayout>
    )
}

