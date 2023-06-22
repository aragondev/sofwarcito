import {
    addTableAttribute,
    deleteAttribute,
    deleteTable,
    updateAttribute,
    updateTable
} from "@/modules/auth/services/firestore";
import Trash from "@/assets/svg/trash.svg";
import Plus from "@/assets/svg/plus.svg";
import Edit from "@/assets/svg/edit.svg";
import {useEffect, useState} from "react";
import {onSnapshot} from "@firebase/firestore";
import {collection} from "firebase/firestore";
import {firestore} from "@/common/config/FirebaseConfig";
import Modal from "@/common/components/elements/Modal";
import {DataType} from "@/modules/diagrams/enums/DataType";

function TableOptions({diagramID, node, func}) {
    const [attributes, setAttributes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [attributeSelected, setAttributeSelected] = useState(undefined);
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState(DataType.varchar);

    useEffect(() => {
        const unsubscribeAttributes = onSnapshot(collection(firestore, "diagrams", diagramID, 'tables', node.id, 'attributes'), (querySnapshot) => {
            const freshAttributes = []
            querySnapshot.forEach((doc) => {
                freshAttributes.push(doc.data());
            });
            setAttributes(freshAttributes)
        });
        return () => {
            unsubscribeAttributes();
        };
    }, [diagramID]);

    function handleDeleteTable() {
        func();
        deleteTable(diagramID, node.id).then()
    }

    function handleDeleteAttribute(attributeID: string) {
        deleteAttribute(diagramID, node.id, attributeID).then();
    }

    function handleSaveAttribute(e) {
        e.preventDefault();
        const attribute = {
            name: fieldName,
            type: fieldType
        }
        if (enableEdit && attributeSelected) {
            updateAttribute(diagramID, node.id, {id: attributeSelected.id, ...attribute}).then();
        }else{
            addTableAttribute(diagramID, node.id, {id: crypto.randomUUID(), ...attribute}).then();
        }
        setFieldType(DataType.varchar);
        setFieldName('');
        setAttributeSelected(undefined);
        setEnableEdit(false);
        setOpenModal(false);
    }

    function updateTableName(e) {
        node.data.title = e.target.value;
        updateTable(diagramID, node).then();
    }

    function handleUpdateAttribute(attribute: any) {
        setFieldType(attribute.type);
        setFieldName(attribute.name);
        setAttributeSelected(attribute);
        setEnableEdit(true);
        setOpenModal(true);
    }

    return <>
        <div>
            <label>{'Name'}</label>
            <input type="text" placeholder={'Write the name of table'} value={node.data.title}
                   onChange={updateTableName}/>
        </div>
        <div>
            <div className={'flex items-center gap-3 mb-2'}>
                <label>{'Attributes'}</label>
                <i onClick={(e) => setOpenModal(true)} className={'cursor-pointer'}>
                    <Plus/>
                </i>
            </div>
            <div className={'flex flex-col gap-2 divide-y divide-gray-400'}>
                {attributes.map((attribute, index) => {
                    return <div key={index} className={'flex gap-2 items-center'}>
                        <span>{attribute.name+':'}</span>
                        <span>{attribute.type}</span>
                        <i onClick={(e) => handleDeleteAttribute(attribute.id)} className={'cursor-pointer'}>
                            <Trash/>
                        </i>
                        <i onClick={(e) => handleUpdateAttribute(attribute)} className={'cursor-pointer'}>
                            <Edit/>
                        </i>
                    </div>
                })}
            </div>
        </div>
        <button className={'bg-black text-white'} onClick={handleDeleteTable}>{'Delete'}</button>
        {openModal && <Modal title={'Add attribute'} func={setOpenModal}>
            <form>
                <div>
                    <label>{'Name'}</label>
                    <input type="text" placeholder={'Write the field name'} value={fieldName}
                           onChange={(e) => setFieldName(e.target.value)}/>
                </div>
                <div>
                    <label>{'Type'}</label>
                    <select defaultValue={fieldType} onChange={(e) => setFieldType(e.target.value as DataType)}>
                        {Object.values(DataType).map((type, index) => {
                            return <option key={index} value={type}>{type}</option>
                        })}
                    </select>
                </div>
                <button className={'bg-black text-white'} onClick={handleSaveAttribute}>{'Save'}</button>
            </form>
        </Modal>}
    </>
}

export default TableOptions
