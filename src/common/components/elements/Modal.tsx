import {ReactNode} from "react";
import Close from '../../../assets/svg/close.svg'

interface Props {
    title:string
    func:Function
    children?: ReactNode
}

function Modal(props:Props) {
    return <div className="absolute top-0 left-0 bg-slate-700 bg-opacity-50 z-50 h-full w-full flex justify-center items-start overflow-auto">
        <div className="bg-white mt-20 min-w-1/3 p-5 divide-y rounded-md">
            <div className="flex justify-between text-gray-700">
                <h2 className="text-xl font-bold">{props.title}</h2>

                <i onClick={()=>props.func(false)} className={'cursor-pointer'}>
                    <Close/>
                </i>
        </div>
        <div className="pt-4">
            {props.children}
        </div>
    </div>
</div>
}

export default Modal
