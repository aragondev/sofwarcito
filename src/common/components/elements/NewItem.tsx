import Plus from '../../../assets/svg/plus.svg'
interface Props {
    title?:string
    onClick: any
}

function NewItem({ title='New', ...props }:Props) {
    return <button type={'button'} className={'new-item'} onClick={props.onClick}>
        <Plus/> {title}
    </button>
}

export default NewItem
