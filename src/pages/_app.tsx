import '../app/globals.css'
import AppLayout from "@/common/components/layouts/AppLayout";

export default function MyApp({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => {
        return <AppLayout>
            {page}
        </AppLayout>
    });

    return getLayout(<Component {...pageProps} />);
    //return <Component {...pageProps} />;
}
