import Loader from '../../../assets/svg/loader.svg'

function Loading(props: any) {
    return <div className={'h-full flex justify-center items-center'}>
        <Loader className={'animate-spin'}/>
    </div>
}

export default Loading
