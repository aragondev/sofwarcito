import { useState } from "react";
import { newDiagram } from "@/modules/auth/services/firestore";

function CreateDiagram(props: any) {
    const [name, setName] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        await newDiagram({ name: name });
        props.func(false);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">{'Nombre'}</label>
            <input type="text" name={'name'} placeholder={'Nombre del diagrama'} required={true} value={name}
                onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={'flex justify-end'}>
            <button className={'btn-black'}>{'Agregar diagrama'}</button>
        </div>
    </form>
}

export default CreateDiagram
