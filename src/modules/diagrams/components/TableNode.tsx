import {Handle, NodeProps, NodeResizer, Position, useStore} from 'reactflow';
import React, {useEffect, useState} from "react";
import {onSnapshot} from "@firebase/firestore";
import {collection} from "firebase/firestore";
import {firestore} from "@/common/config/FirebaseConfig";
import {useRouter} from "next/router";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default function TableNode(props:NodeProps) {
    const router = useRouter();
    const diagramID = router.query.id as string;
    const connectionNodeId = useStore(connectionNodeIdSelector);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const unsubscribeAttributes = onSnapshot(collection(firestore, "diagrams", diagramID, 'tables', props.id, 'attributes'), (querySnapshot) => {
            const freshAttributes = []
            querySnapshot.forEach((doc) => {
                freshAttributes.push(doc.data());
            });
            setAttributes(freshAttributes)
        });
        return () => {
            unsubscribeAttributes();
        };
    }, [diagramID]);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== props.id;

    return <>
        {/*<NodeResizer isVisible={!isConnecting} minWidth={160} minHeight={80}/>*/}
        <div className={`node-table ${isConnecting ? 'node-target' : ''}`}>
            <strong className={'node-table-head'}>{props.data.title?props.data.title:' '}</strong>
            <div className="node-table-body">
                {
                    attributes.map((attribute, index)=>{
                        return <div key={index}>{attribute.name}: {attribute.type}</div>
                    })
                }
                {!isConnecting && (
                        <Handle className="custom-edge-point" position={Position.Right} type="source"/>
                )}
                <Handle
                    className="custom-edge-point"
                    position={Position.Left}
                    type="target"
                    isConnectableStart={false}
                />
            </div>

        </div>
    </>
}
