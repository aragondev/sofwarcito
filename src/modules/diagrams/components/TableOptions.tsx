import { useState, useEffect } from "react";
import { onSnapshot, collection } from "@firebase/firestore";
import { firestore } from "@/common/config/FirebaseConfig";
import Modal from "@/common/components/elements/Modal";
import Trash from "@/assets/svg/trash.svg";
import Plus from "@/assets/svg/plus.svg";
import Edit from "@/assets/svg/edit.svg";
import { DataType } from "@/modules/diagrams/enums/DataType";
import {
    addTableAttribute,
    deleteAttribute,
    deleteTable,
    updateAttribute,
    updateTable,
} from "@/modules/auth/services/firestore";

function TableOptions({ diagramID, node, func }) {
    const [attributes, setAttributes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [attributeSelected, setAttributeSelected] = useState(undefined);
    const [fieldName, setFieldName] = useState("");
    const [fieldType, setFieldType] = useState(DataType.varchar);

    useEffect(() => {
        const unsubscribeAttributes = onSnapshot(
            collection(
                firestore,
                "diagrams",
                diagramID,
                "tables",
                node.id,
                "attributes"
            ),
            (querySnapshot) => {
                const freshAttributes = [];
                querySnapshot.forEach((doc) => {
                    freshAttributes.push(doc.data());
                });
                setAttributes(freshAttributes);
            }
        );
        return () => {
            unsubscribeAttributes();
        };
    }, [diagramID]);

    function handleDeleteTable() {
        func();
        deleteTable(diagramID, node.id).then();
    }

    function handleDeleteAttribute(attributeID) {
        deleteAttribute(diagramID, node.id, attributeID).then();
    }

    function handleSaveAttribute(e) {
        e.preventDefault();
        const attribute = {
            name: fieldName,
            type: fieldType,
        };
        if (enableEdit && attributeSelected) {
            updateAttribute(diagramID, node.id, { id: attributeSelected.id, ...attribute }).then();
        } else {
            addTableAttribute(diagramID, node.id, { id: crypto.randomUUID(), ...attribute }).then();
        }
        setFieldType(DataType.varchar);
        setFieldName("");
        setAttributeSelected(undefined);
        setEnableEdit(false);
        setOpenModal(false);
    }

    function updateTableName(e) {
        const updatedNode = { ...node };
        updatedNode.data.title = e.target.value;
        updateTable(diagramID, updatedNode).then();
    }

    function handleUpdateAttribute(attribute) {
        setFieldType(attribute.type);
        setFieldName(attribute.name);
        setAttributeSelected(attribute);
        setEnableEdit(true);
        setOpenModal(true);
    }

    return (
        <>
            <div>
                <label htmlFor="tableName">Nombre</label>
                <input
                    id="tableName"
                    type="text"
                    placeholder="Escriba el nombre de la tabla"
                    value={node.data.title}
                    onChange={updateTableName}
                />
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <label>Atributos</label>
                    <i className="cursor-pointer" onClick={() => setOpenModal(true)}>
                        <Plus />
                    </i>
                </div>
                <div className="flex flex-col gap-2 divide-y divide-gray-400">
                    {attributes.map((attribute, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <span>{attribute.name + ":"}</span>
                            <span>{attribute.type}</span>
                            <i
                                className="cursor-pointer"
                                onClick={() => handleDeleteAttribute(attribute.id)}
                            >
                                <Trash />
                            </i>
                            <i
                                className="cursor-pointer"
                                onClick={() => handleUpdateAttribute(attribute)}
                            >
                                <Edit />
                            </i>
                        </div>
                    ))}
                </div>
            </div>
            <button className="bg-black text-white" onClick={handleDeleteTable}>
                Delete
            </button>
            {openModal && (
                <Modal title="Agregar un atributo" func={() => setOpenModal(false)}>
                    <form>
                        <div>
                            <label htmlFor="attributeName">Nombre</label>
                            <input
                                id="attributeName"
                                type="text"
                                placeholder="Escriba el nombre del atributo"
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="attributeType">Tipo</label>
                            <select
                                id="attributeType"
                                defaultValue={fieldType}
                                onChange={(e) => setFieldType(e.target.value)}
                            >
                                {Object.values(DataType).map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="bg-black text-white" onClick={handleSaveAttribute}>
                            Guardar
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
}

export default TableOptions;
