import { useState } from "react";
import Modal from "@/common/components/elements/Modal";
import CreateDiagram from "@/modules/diagrams/components/CreateDiagram";
import ListDiagrams from "@/modules/diagrams/components/ListDiagrams";
import { RiAddCircleLine } from "react-icons/ri";

function Index(props: any) {
    const [openModal, setOpenModal] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div className="p-5 relative">
                <div className="flex justify-center">
                    <div
                        className="fixed bottom-5 right-5 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                        onClick={(e) => setOpenModal(true)}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {hovered && (
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-500 text-center">
                                Nuevo diagrama
                            </span>
                        )}
                        <RiAddCircleLine
                            size={40}
                            className={`text-red-500 ${hovered ? "border-2 border-red-500" : ""
                                }`}
                        />
                    </div>
                </div>
                <ListDiagrams />
            </div>
            {openModal && (
                <Modal title="Crear Diagrama" func={setOpenModal}>
                    <CreateDiagram func={setOpenModal} />
                </Modal>
            )}
        </>
    );
}

export default Index;
