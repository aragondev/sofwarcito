import GoogleSignIn from "@/modules/auth/components/GoogleSignIn";
import AuthLayout from "@/modules/auth/components/AuthLayout";

export default function SignIn() {
    return <GoogleSignIn/>
}

SignIn.getLayout = function getLayout(page) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}
