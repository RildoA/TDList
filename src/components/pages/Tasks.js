import InpuTask from '../layouts/InpuTask'
import { useState, useEffect, useContext } from 'react'
import TaskCard from '../modelos/TaskCard';
import {useLocation} from 'react-router-dom'
import Message from '../layouts/Message'
import Api from '../../Api'
import style from './Tasks.module.css'

function Tasks(){
    const [list, setList] = useState([]);
    const [message, setMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const location = useLocation()

    useEffect(()=>{
        if(location.state){
            setMessage(location.state.message);
            setTypeMessage(location.state.typeMessage);
        }
        Api.get("user/tasks").then((res)=>{
            setList(res.data.tasks);
        }).catch((e)=>{
            console.log("Houve um erro ao carregar tarefas: "+e);
        })
    },[location.state])

    function add(task){
        Api.patch("user/tasks/add",{newTask: task, idTask: list.length}).then((res)=>{
            setList(res.data.tasks);
        }).catch((e)=>{
            console.log("Houve um erro ao adicionar tarefa: "+e)
        })
        
    }
    function deleteTask(task){
        Api.patch("user/tasks/delete",{idTask: task.id}).then((res)=>{    
            setList(res.data.tasks)
        }).catch(e=>console.log("Houve um erro ao deletar tarefa: "+e))
    }
    function editTask(id,nameTask){
        Api.patch("user/tasks/edit",{idTask: id, nameTask: nameTask}).then((res)=>{
            setList(res.data.tasks);
        }).catch(e=>console.log("Houve um erro ao editar tarefa: "+e))

    }
    function changeStatus(id){
        Api.patch("user/tasks/done",{idTask: id}).then((res)=>{
            setList(res.data.tasks)
        }).catch(e=>console.log("Houve um erro ao mudar o estado da tarefa: "+e))
    }
    return(
        <div className={style.container}>
            {message && <Message message={message} typeMessage={typeMessage}/>}
            <InpuTask addTask={add} />
            {list.length>0 && list.map((task)=>(
                <TaskCard key={task.id} task={task} handleDelete={deleteTask} handleEdit={editTask} handleChangeStatus={changeStatus}/>
            ))
            }
            {list.length === 0 && <p>Nenhuma tarefa ainda</p>} 
        </div>
        
    )
}

export default Tasks