import SideBar from "@/modules/diagrams/components/SideBar";
import AppLayout from "@/common/components/layouts/AppLayout";

export default function DiagramLayout({ children }) {
    return <AppLayout background={'white'}>
        <div className={'h-full flex'}>
            <SideBar />
            {children}
        </div>
    </AppLayout>
}

