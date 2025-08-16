import style from './TaskCard.module.css'
import { useState, useEffect } from 'react'

function TaskCard({task, handleDelete, handleEdit, handleChangeStatus}){

    const [editActive, setEditActive] = useState(false)
    const [nameTask, setNameTask] = useState('')

    useEffect(()=>{
        setNameTask(task.name);
    },[task.name])

    function deleteTask(){
        handleDelete(task)
    }
    function editTask(){
        setEditActive(true);
    }
    function finalizarEdicao(){
        setEditActive(false);
        handleEdit(task.id, nameTask);
    }
    function mudarEstado(){
        handleChangeStatus(task.id)
    }
    return(
        <div className={task.status===0?style.tasks:style.taskDone}>
            {editActive?
                <input 
                    type='text' 
                    name="task" 
                    placeholder='Renomeie a tarefa' 
                    onChange={e=>setNameTask(e.target.value)} 
                    value={nameTask}
                />
            :
                <p>{nameTask}</p>
                
            }
            <span>
                {editActive?(
                    <div>
                        <button onClick={finalizarEdicao}>Editar Tarefa</button>
                    </div>
                ):(
                    <div>
                        <button onClick={deleteTask}>Eliminar</button>
                        <button onClick={editTask}>Editar</button>
                        <button onClick={mudarEstado}>{task.status===0?"Feita":"Desfazer"}</button>
                    </div>
                )}
                    
            </span>
                        
        </div>
    )
}

export default TaskCard