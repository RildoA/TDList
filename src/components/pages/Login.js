import style from './Signup.module.css'
import { useContext, useState } from "react"
import Input from "../layouts/Input"
import Api from '../../Api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContext'

function Login(){

    const {login}= useContext(AuthContext);
    const [user,setUser] = useState({});
    const navigate = useNavigate()

    function submit(e){
        e.preventDefault();
        Api.post("login",user).then((res)=>{
            navigate("/tasks",{state: {message: res.data.message, typeMessage: res.data.typeMessage}});
            if(res.data.typeMessage === "success")
                login(res.data.user);
        }).catch((error)=>{
            console.log("Erro ao iniciar sessão: "+error)
            navigate("/",{state: {message: "Erro ao iniciar sessão", typeMessage: "error"}})
        })

    }

    function handleOnChange(e){
        setUser({...user,[e.target.name]:e.target.value})
    }

    return(
        <form onSubmit={submit} className={style.form}>
            <h1>Iniciar sessão:</h1>
            <Input
            labelText="Email"
            type="email"
            name="email"
            handleChange={handleOnChange}
            placeholder="Digite o seu email"
            />
            <Input
            labelText="Senha"
            type="password"
            name="password"
            handleChange={handleOnChange}
            placeholder="Digite o seu senha"
            />
            <button type="submit">Iniciar sessão</button>
        </form>
    )
}

export default Login