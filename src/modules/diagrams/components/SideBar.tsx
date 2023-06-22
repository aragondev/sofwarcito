import Close from "@/assets/svg/close.svg";
import {NodeType} from "@/modules/diagrams/enums/NodeType";
import EdgeOptions from "@/modules/diagrams/components/EdgeOptions";
import TableOptions from "@/modules/diagrams/components/TableOptions";

interface Props {
    diagramID:string
    func: Function,
    item: {
        type: string,
        node: any
    }
}

function SideBar(props: Props) {
    return <div className={'h-full w-full border bg-white'}>
        <div className={'flex justify-between border-b-2 p-2'}>
            <h3 className={'text-center'}>{'Options'}</h3>
            <i onClick={() => props.func()} className={'cursor-pointer'}>
                <Close/>
            </i>
        </div>
        { props.item &&
            <div className={'flex flex-col gap-5 p-3'}>
                <h2>{'Type: ' + props.item.type}</h2>
                {props.item.type === NodeType.Edge ?
                    <EdgeOptions node={props.item.node} diagramID={props.diagramID} func={props.func}/> :
                    <TableOptions node={props.item.node} diagramID={props.diagramID} func={props.func}/>
                }
            </div>
        }
    </div>
}

export default SideBar
