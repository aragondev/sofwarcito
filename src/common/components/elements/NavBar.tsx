import {logout} from "@/modules/auth/services/auth";
import Link from "next/link";

function NavBar(props: any) {
    return <div className={'h-16 bg-black border-b-2 border-white w-full flex justify-between items-center px-3'}>
        <Link href={'/app'}>
            <h1 className={'text-xl text-white font-bold'}>{'DiagramDB'}</h1>
        </Link>
        <div>
            <button className={'sign-out'} onClick={(e)=>logout()}>SignOut</button>
        </div>
    </div>
}

export default NavBar
