import { googleSignIn } from "@/modules/auth/services/auth";
import { useRouter } from "next/navigation";

function GoogleSignIn() {
    const router = useRouter();

    async function handleSignIn(e: any) {
        try {
            const authResponse = await googleSignIn();
            if (authResponse) {
                router.push("/app");
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="bg-white rounded-md w-1/2 h-1/2 flex flex-col justify-center items-center p-8">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="flex flex-col space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sign In
                </button>
            </form>
            <div className="mt-4">
                <button
                    className="bg-red-500 text-white rounded-md px-4 py-2 flex items-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={handleSignIn}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-2"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2C5.73 2 2 5.73 2 10s3.73 8 8 8 8-3.73 8-8-3.73-8-8-8zm-1 13H7v-2h2v2zm0-4H7V7h2v4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default GoogleSignIn;
