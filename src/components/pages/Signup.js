import style from './Signup.module.css'
import Input from "../layouts/Input"
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signup(){

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    function submit(e){
        e.preventDefault();
        Api.post("signup",{user: user}).then(()=>{
            navigate("/",{state: {message: "Conta criada com sucesso", typeMessage: "success"}})
        }).catch(error=>console.log("Houve um erro ao criar conta: "+error))
    }

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <form className={style.form} onSubmit={submit} method="POST">
            <h1>Criar conta:</h1>
            <Input 
            labelText="Nome" 
            type="text" 
            name="name" 
            placeholder="Digite o seu nome"
            handleChange={handleOnChange}
            />
            <Input 
            labelText="Email" 
            type="email" 
            name="email" 
            placeholder="Digite o seu email"
            handleChange={handleOnChange}
            />
            <Input 
            labelText="Senha" 
            type="password" 
            name="password" 
            placeholder="Digite o seu senha"
            handleChange={handleOnChange}
            />
            <button type="submit">Criar conta</button>
        </form>
    )
}

export default Signup