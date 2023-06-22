import {auth} from "@/common/config/FirebaseConfig";
import {firestore} from "@/common/config/FirebaseConfig";
import {addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";


export async function newDiagram(data: any) {
    const id = crypto.randomUUID();
    await setDoc(doc(firestore, "diagrams", id), {
        ...data,
        id: id,
        owner_id: auth.currentUser?.uid,
        owner_email: auth.currentUser?.email,
        members: [
            auth.currentUser?.email
        ],
        edges: [],
        nodes: []
    });
}

export async function updateDiagram(diagramID: string, data: any) {
    const diagramRef = doc(firestore, "diagrams", diagramID);

    await updateDoc(diagramRef, data);
}

export async function addMember(diagramID: string, email: string) {
    const diagramRef = doc(firestore, "diagrams", diagramID);

    await updateDoc(diagramRef, {
        members: arrayUnion(email)
    });
}

export async function removeMember(diagramID: string, email: string) {
    const diagramRef = doc(firestore, "diagrams", diagramID);

    await updateDoc(diagramRef, {
        members: arrayRemove(email)
    });
}

export async function addTable(diagramID: string, data: any) {
    await setDoc(doc(firestore, "diagrams", diagramID, 'tables', data.id), data);
}

export async function addNewEdge(diagramID: string, data: any) {
    await setDoc(doc(firestore, "diagrams", diagramID, 'edges', data.id), data);
}

export async function updateTable(diagramID: string, data: any, oldData?: any) {
    let tableRef = doc(firestore, "diagrams", diagramID, 'tables', data.id);
    data.selected = false
    data.dragging = false
    await updateDoc(tableRef, data);

    if (oldData && oldData.node.id !== data.id) {
        tableRef = doc(firestore, "diagrams", diagramID, 'tables', oldData.node.id);
        oldData.node.selected = false
        oldData.node.data.blocked = false
        oldData.node.data.blockedBy = ''
        oldData.node.dragging = false
        await updateDoc(tableRef, {
            data: oldData.node.data,
            dragging: false,
            selected: false
        });
    }
}

export async function updateEdge(diagramID: string, data: any, oldData?: any) {
    let edgeRef = doc(firestore, "diagrams", diagramID, 'edges', data.id);
    await updateDoc(edgeRef, data);

    if (oldData && oldData.node.id !== data.id) {
        edgeRef = doc(firestore, "diagrams", diagramID, 'edges', oldData.node.id);
        oldData.node.selected = false
        oldData.node.data.blocked = false
        oldData.node.data.blockedBy = ''
        await updateDoc(edgeRef, {
            data: oldData.node.data,
            selected: false
        });
    }
}

export async function deleteEdge(diagramID:String, edgeID:string){
    await deleteDoc(doc(firestore, "diagrams", diagramID, 'edges', edgeID));
}

export async function deleteTable(diagramID:String, tableID:string){
    await deleteDoc(doc(firestore, "diagrams", diagramID, 'tables', tableID));
}

export async function addTableAttribute(diagramID: string, tableID:string, data: any) {
    await setDoc(doc(firestore, "diagrams", diagramID, 'tables', tableID,'attributes', data.id), data);
}

export async function deleteAttribute(diagramID:String, tableID:string, attributeID:string){
    await deleteDoc(doc(firestore, "diagrams", diagramID, 'tables', tableID,'attributes', attributeID));
}

export async function updateAttribute(diagramID: string, tableID:string, data: any) {
    let attributeRef = doc(firestore, "diagrams", diagramID, 'tables', tableID, 'attributes', data.id);
    await updateDoc(attributeRef, data);
}
