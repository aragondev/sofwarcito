import { useEffect, useState } from "react";
import Link from "next/link";
import { onSnapshot, query, where } from "@firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { auth, firestore } from "@/common/config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { RiFileChartLine } from "react-icons/ri";

function ListDiagrams(props: any) {
    const [diagrams, setDiagrams] = useState([]);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/auth/signin");
            }
            const q = query(
                collection(firestore, "diagrams"),
                where("members", "array-contains", user?.email)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const freshDiagrams = [];
                querySnapshot.forEach((doc) => {
                    freshDiagrams.push(doc.data());
                });
                setDiagrams(freshDiagrams);
            });

            return () => {
                unsubscribe();
            };
        });
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-5">
            {diagrams.map((diagram, index) => (
                <Link href={`app/diagram/${diagram.id}`} key={index}>
                    <div className="diagram-card bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md p-4 cursor-pointer flex flex-col items-center">
                        <RiFileChartLine className="text-white text-3xl mb-2" />
                        <h2 className="text-white text-center text-lg font-bold">{diagram.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );

}

export default ListDiagrams;
