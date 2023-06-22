import TableNode from "@/modules/diagrams/components/TableNode";
import ReactFlow, {
    addEdge, Background, BackgroundVariant, ControlButton,
    Controls, EdgeTypes,
    MiniMap,
    Panel,
    useEdgesState,
    useNodesState,
    useReactFlow
} from "reactflow";
import React, {useCallback, useEffect, useState} from "react";
import {saveAsImage} from "@/modules/diagrams/utils/image-export";
import CustomEdgeStartEnd from "@/modules/diagrams/components/CustomEdgeStartEnd";
import SideBar from "@/modules/diagrams/components/SideBar";
import {NodeType} from "@/modules/diagrams/enums/NodeType";
import {EdgeType} from "@/modules/diagrams/enums/EdgeType";
import Markers from "@/modules/diagrams/components/Markers";
import {Cardinality} from "@/modules/diagrams/enums/Cardinality";
import {useRouter} from "next/router";
import {onSnapshot} from "@firebase/firestore";
import {collection, doc} from "firebase/firestore";
import {auth, firestore} from "@/common/config/FirebaseConfig";
import {
    addMember,
    addNewEdge,
    addTable, removeMember,
    updateDiagram,
    updateEdge,
    updateTable
} from "@/modules/auth/services/firestore";
import Loading from "@/modules/auth/components/Loading";
import Modal from "@/common/components/elements/Modal";
import {DataType} from "@/modules/diagrams/enums/DataType";
import Trash from "@/assets/svg/trash.svg";

const initialNodes = [
    {
        id: '1',
        type: NodeType.Custom,
        position: {x: 0, y: 0},
        data: {title: 'New table'},
    },
    {
        id: '2',
        type: NodeType.Custom,
        position: {x: 250, y: 320},
        data: {title: 'New table'},
    },
];

const initialEdges = [];

const connectionLineStyle = {
    strokeWidth: 1,
    stroke: 'black',
};

const nodeTypes = {
    custom: TableNode,
};

const minimapStyle = {
    height: 120,
};

const defaultEdgeOptions = {
    type: 'start-end',
    data: {
        startCardinality: Cardinality.One,
        label: '',
        endCardinality: Cardinality.One,
    },
    markerEnd: EdgeType.Association,
};

const edgeTypes: EdgeTypes = {
    'start-end': CustomEdgeStartEnd,
};

export function Diagram() {
    const router = useRouter()
    const diagramID = router.query.id as string;
    const userID = auth.currentUser?.uid
    const [diagram, setDiagram] = useState<any>(undefined)
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
    const {setViewport} = useReactFlow();
    const [nodeSelected, setNodeSelected] = useState<any>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (diagramID) {
            const unsubscribeDiagram = onSnapshot(doc(firestore, "diagrams", diagramID), (doc) => {
                const freshDiagram = doc.data();
                setDiagram(freshDiagram);
            });

            const unsubscribeTables = onSnapshot(collection(firestore, "diagrams", diagramID, 'tables'), (querySnapshot) => {
                const freshNodes = []
                querySnapshot.forEach((doc) => {
                    freshNodes.push(doc.data());
                });
                setNodes(freshNodes)
            });

            const unsubscribeEdges = onSnapshot(collection(firestore, "diagrams", diagramID, 'edges'), (querySnapshot) => {
                const freshEdges = []
                querySnapshot.forEach((doc) => {
                    freshEdges.push(doc.data());
                });
                setEdges(freshEdges)
            });
            return () => {
                unsubscribeDiagram();
                unsubscribeTables();
                unsubscribeEdges();
            };
        }
    }, [diagramID])

    const flowKey = 'example-flow';

    const onConnect = (params) => {
        setEdges((eds) => {
            const existEdge = eds.find(edge => {
                return edge.source === params.source && edge.target === params.target || edge.source === params.target && edge.target === params.source
            })
            if (existEdge) {
                return eds
            }
            const newEdge = {id: crypto.randomUUID(), ...params}
            const freshEdges = addEdge(newEdge, eds)
            addNewEdge(diagramID, newEdge).then();
            return freshEdges
        })
    };

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const {x = 0, y = 0, zoom = 1} = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({x, y, zoom});
            }
        };

        restoreFlow().then(() => {
            console.log('restored')
        });
    }, [setNodes, setViewport]);

    const onAdd = () => {
        const newNode = {
            id: crypto.randomUUID(),
            data: {
                title: 'New table',
                blocked: false
            },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            },
            type: NodeType.Custom
        };
        setNodes((nds) => {
            const freshNodes = nds.concat(newNode)
            addTable(diagramID, newNode).then();
            return freshNodes
        });
    };

    const onNodeClick = (event, node) => {
        node.data.blocked = true;
        updateTable(diagramID, node, nodeSelected).then();
        if (nodeSelected && node.id === nodeSelected.node.id) {
            setNodeSelected(undefined);
            return;
        }
        setNodeSelected({
            type: NodeType.Table,
            node: nodes.find(item => item.id === node.id)
        })
    }

    const onNodeDragStart = (event, node) => {
        const currentNode = nodes.find(item => item.id === node.id)
        if (currentNode && currentNode.data.blocked && currentNode.data.blockedBy !== userID) {
            return
        }
        closePanel();
        node.data.blocked = true;
        node.data.blockedBy = userID;
        updateTable(diagramID, node).then();
        /*        if (nodeSelected && node.id === nodeSelected.node.id) {
                    setNodeSelected(undefined);
                    return;
                }*/
        setNodeSelected({
            type: NodeType.Table,
            node: currentNode
        })
    };
    const onNodeDragStop = (event, node) => {
        //node.data.blocked = false;
        updateTable(diagramID, {
            id: node.id,
            position: node.position,
            positionAbsolute: node.positionAbsolute,
        }).then();
    };

    const onEdgeClick = (event, node) => {
        const currentNode = edges.find(item => item.id === node.id)
        if (currentNode && currentNode.data.blocked && currentNode.data.blockedBy !== userID) {
            return
        }
        closePanel();
        node.data.blocked = true;
        node.data.blockedBy = userID;
        updateEdge(diagramID, node).then();
        /*        if (nodeSelected && node.id === nodeSelected.node.id) {
                    setNodeSelected(undefined);
                    return;
                }*/
        setNodeSelected({
            type: NodeType.Edge,
            node: edges.find(item => item.id === node.id)
        })
    }

    const closePanel = () => {
        if (!nodeSelected) {
            return
        }
        nodeSelected.node.data.blocked = false;
        nodeSelected.node.data.blockedBy = ''
        if (nodeSelected.type === NodeType.Edge) {
            updateEdge(diagramID, {id: nodeSelected.node.id, data: nodeSelected.node.data}).then();
        } else {
            updateTable(diagramID, {id: nodeSelected.node.id, data: nodeSelected.node.data}).then();
        }
        setNodeSelected(undefined);
    }

    if (!diagramID) {
        return <Loading/>
    }

    function handleAddMember(e) {
        addMember(diagramID, email).then();
    }

    function handleRemoveMember(email) {
        removeMember(diagramID, email).then();
    }

    return <div className={'h-full w-full flex'}>
        <Markers/>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            elementsSelectable={true}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onInit={setRfInstance}
            //onNodeClick={onNodeClick}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            onEdgeClick={onEdgeClick}
            connectionLineStyle={connectionLineStyle}>
            {diagramID &&
                <Panel position="top-right" className={'flex gap-5'}>
                    {/*                    <button onClick={onSave}>save</button>
                    <button onClick={onRestore}>restore</button>*/}
                    <button className={'btn-black'} onClick={onAdd}>{'Agregar tabla'}</button>
                    { diagram && userID===diagram.owner_id &&
                        <button className={'btn-black'} onClick={() => setOpenModal(true)}>{'Mienbros'}</button>
                    }
                </Panel>
            }
            <Panel position="top-left" className={'w-1/4'}>
                <SideBar func={closePanel} item={nodeSelected} diagramID={diagramID}/>
            </Panel>
            {/* <MiniMap style={minimapStyle} zoomable pannable/>
            <Controls>
                <ControlButton onClick={(e) => saveAsImage()}/>
            </Controls> */}
            {/* <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines}/>
            <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines}/> */}
        </ReactFlow>
        {openModal && <Modal title={'Members'} func={setOpenModal}>
            <div className={'flex flex-col gap-5'}>
                <div>
                    <label>{'Email'}</label>
                    <div className={'flex gap-5'}>
                        <input type="text" placeholder={'Write the email of user'} value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <button className={'bg-black text-white'} onClick={handleAddMember}>{'Add'}</button>
                    </div>
                </div>
                <div className={'divide-y divide-gray-400'}>
                    {diagram && diagram.members.map((member,index)=>{
                        return <div key={index} className={'w-full flex justify-between'}>
                            { auth.currentUser?.email!==member &&
                                <>
                                    <span>{member}</span>
                                    <i onClick={(e) => handleRemoveMember(member)} className={'cursor-pointer'}>
                                        <Trash/>
                                    </i>
                                </>
                            }
                        </div>
                    })}
                </div>
            </div>

        </Modal>}
    </div>
};
