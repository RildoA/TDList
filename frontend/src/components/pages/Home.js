import { Link, useLocation } from 'react-router-dom'
import style from './Home.module.css'
import { useEffect, useState } from 'react'
import Message from '../layouts/Message';

function Home(){
    const [message, setMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const location = useLocation();

    useEffect(()=>{
        if(location.state){
            setMessage(location.state.message);
            setTypeMessage(location.state.typeMessage);
        }
    },[location.state])
    return(
        <div className={style.main}>
            <div className={style.message} >
                {message && <Message message={message} typeMessage={typeMessage}/>}
            </div>
            
            <div className={style.container}>
                <h1>Bem vindo à <span>TDList</span></h1>
                <p>A sua to-do list favorita</p>
                <div className={style.info}>
                    <Link to="/signup">Criar Conta</Link>
                    <Link to="/login">Inicar sessão</Link>
                </div>
            </div>
        </div>
        
    )
}

export default Home