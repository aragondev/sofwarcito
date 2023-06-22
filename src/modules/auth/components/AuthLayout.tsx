export default function AuthLayout({ children }) {
    return (
        <main
            className={'bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center h-screen'}
        >
            {children}
        </main>
    );

}
