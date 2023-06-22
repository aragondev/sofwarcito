import {EdgeType} from "@/modules/diagrams/enums/EdgeType";
import {Cardinality} from "@/modules/diagrams/enums/Cardinality";
import {deleteEdge, updateEdge} from "@/modules/auth/services/firestore";

function EdgeOptions({diagramID, node, func}) {
    function updateEndCardinality(e) {
        node.data.endCardinality = e.target.value;
        updateEdge(diagramID, node).then();
    }

    function updateStartCardinality(e) {
        node.data.startCardinality = e.target.value;
        updateEdge(diagramID, node).then();
    }

    function updateEdgeType(e) {
        node.markerEnd = e.target.value;
        updateEdge(diagramID, node).then();
    }

    function handleDeleteEdge() {
        func();
        deleteEdge(diagramID, node.id).then()
    }

    return <>
        <select defaultValue={node.markerEnd} onChange={updateEdgeType}>
            {Object.values(EdgeType).map((type, index) => {
                return <option key={index} value={type}>{type}</option>
            })}
        </select>
        <div className={'flex gap-5'}>
            <div className={'w-full'}>
                <label>{'Start cardinality'}</label>
                <select defaultValue={node.data.startCardinality} onChange={updateStartCardinality}>
                    {Object.values(Cardinality).map((cardinality, index) => {
                        return <option key={index} value={cardinality}>{cardinality}</option>
                    })}
                </select>
            </div>
            <div className={'w-full'}>
                <label>{'End cardinality'}</label>
                <select defaultValue={node.data.endCardinality} onChange={updateEndCardinality}>
                    {Object.values(Cardinality).map((cardinality, index) => {
                        return <option key={index} value={cardinality}>{cardinality}</option>
                    })}
                </select>
            </div>
        </div>
        <button className={'bg-black text-white'} onClick={handleDeleteEdge}>{'Delete'}</button>
    </>
}

export default EdgeOptions
