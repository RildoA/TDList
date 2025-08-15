import { useState } from 'react'
import style from './InpuTask.module.css'

function InpuTask({addTask}){

    const [item, setItem] = useState()
    function submit(e){
        e.preventDefault()
        addTask(item);
    }
    return (
        <form className={style.input_container} onSubmit={submit}>
            <input type="text" name='task' placeholder="Digite a sua tarefa" onChange={(e)=>setItem(e.target.value)}/>
            <button type="submit"> Adicionar</button>
        </form>
    )
}

export default InpuTask