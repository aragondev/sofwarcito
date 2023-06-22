export default function AuthLayout({ children }) {
    return (
        <main className={'bg-black flex items-center justify-center h-screen'}>
            {children}
        </main>
    );
}
