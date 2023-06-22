import {googleSignIn} from "@/modules/auth/services/auth";
import {useRouter} from "next/navigation";

function GoogleSignIn() {

    const router = useRouter();
    async function handleSignIn(e:any) {
        try {
            const authResponse = await googleSignIn();
            if (authResponse){
                router.push('/app');
            }
        }catch (e) {
            console.log(e)
            console.error(e);
        }

    }


    return <div className={'bg-white rounded-md w-1/2 h-1/2 flex justify-center items-center'}>
        <button className={'google-sign-in-btn'} onClick={handleSignIn}>{'Sign in with Google'}</button>
    </div>
}

export default GoogleSignIn
