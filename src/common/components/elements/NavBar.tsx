import { logout, getCurrentUser } from "@/modules/auth/services/auth";
import Link from "next/link";
import { auth, firestore } from "@/common/config/FirebaseConfig";

function NavBar(auth: any) {
    const { username } = auth; // Nombre de usuario obtenido de props

    return (
        <div className="h-16 bg-white border-b-2 border-black w-full flex justify-between items-center px-3">
            <Link href="/app">
                <h1 className="text-xl text-black ">SOFTWARCITO BY {auth.user ?? "Anonimo"}</h1>
            </Link>
            <div className="flex items-center">
                <p className="text-white mr-3">{auth.user}</p> {/* Muestra el nombre de usuario */}
                <button
                    className="bg-red-500 text-white rounded-md px-4 py-2"
                    onClick={(e) => logout()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default NavBar;
