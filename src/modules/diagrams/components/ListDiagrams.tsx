import {useEffect, useState} from "react";
import Link from "next/link";
import {onSnapshot, query, where} from "@firebase/firestore";
import {collection, doc} from "firebase/firestore";
import {auth, firestore} from "@/common/config/FirebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";

function ListDiagrams(props: any) {
    const [diagrams, setDiagrams] = useState([]);
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user){
                router.push('/auth/signin')
            }
            const q = query(collection(firestore, "diagrams"), where("members", "array-contains", user?.email))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const freshDiagrams = []
                querySnapshot.forEach((doc) => {
                    freshDiagrams.push(doc.data());
                });
                setDiagrams(freshDiagrams)
            });

            return () => {
                unsubscribe();
            };
        });
    }, [])

    return <div className={'grid grid-cols-4 place-items-center my-5 gap-5'}>
        {diagrams.map((diagram, index) => {
            return <Link href={`app/diagram/${diagram.id}`} key={index} className={'diagram-card'}>
                <h2 className={'text-center'}>{diagram.name}</h2>
            </Link>
        })}
    </div>
}

export default ListDiagrams
