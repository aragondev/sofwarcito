import {EdgeType} from "@/modules/diagrams/enums/EdgeType";

function Markers(props: any) {
    return <>
        <svg style={{position: 'absolute', bottom: 0, left: 0}}>
            <defs>
                <marker
                    id={EdgeType.Association}
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="15"
                    markerHeight="15"
                    orient="auto">
                </marker>
            </defs>
            <defs>
                <marker
                    id={EdgeType.Inheritance}
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="15"
                    markerHeight="15"
                    orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={'#ffffff'} stroke={'#000000'}/>
                </marker>
            </defs>
            <defs>
                <marker
                    id={EdgeType.Aggregation}
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="15"
                    markerHeight="15"
                    orient="auto">
                    <path d="M 5 0 L 0 5 L 5 10 L 10 5 z" fill={'#ffffff'} stroke={'#000000'} strokeWidth={1}/>
                </marker>
            </defs>
            <defs>
                <marker
                    id={EdgeType.Composition}
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="15"
                    markerHeight="15"
                    orient="auto">
                    <path d="M 5 0 L 0 5 L 5 10 L 10 5 z" fill={'#000000'} stroke={'#000000'} strokeWidth={1}/>
                </marker>
            </defs>
        </svg>
    </>
}

export default Markers
