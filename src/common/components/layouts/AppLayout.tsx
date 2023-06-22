import NavBar from "@/common/components/elements/NavBar";
import {useEffect} from "react";
import {isAuthenticated} from "@/modules/auth/services/auth";
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/common/config/FirebaseConfig";

function AppLayout({children,background='black'}:any) {
    const router = useRouter()

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(!user){
                router.push('/auth/signin')
            }
        });
    },[]);
    return <main className={`bg-${background} h-screen flex flex-col`}>
        <NavBar/>
        <div className={'grow'}>
            {children}
        </div>

    </main>
}

export default AppLayout
