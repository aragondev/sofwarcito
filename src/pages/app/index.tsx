import NewItem from "@/common/components/elements/NewItem";
import {useState} from "react";
import Modal from "@/common/components/elements/Modal";
import CreateDiagram from "@/modules/diagrams/components/CreateDiagram";
import ListDiagrams from "@/modules/diagrams/components/ListDiagrams";

function Index(props: any) {
    const [openModal, setOpenModal] = useState(false);


    return <>
    <div className={'p-5'}>
        <div className={'flex justify-center'}>
            <NewItem title={'New diagram'} onClick={(e)=>setOpenModal(true)}/>
        </div>
        <ListDiagrams/>
    </div>
        {openModal && <Modal title={'Create diagram'} func={setOpenModal}>
            <CreateDiagram  func={setOpenModal}/>
        </Modal>}
        </>
}

export default Index
