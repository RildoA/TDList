import { createContext, useEffect, useState } from "react"
import Api from "../../Api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate()


    useEffect(()=>{
        try{
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if(!storedUser){
                return
            }
            Api.get("logged")
            .then((res)=>setUser(res.data.user))
            .catch(()=>{
                localStorage.removeItem("user");
                setUser(null);
            })
        }
        catch(e){
            console.error("Houve um erro no JSON: "+e);
            localStorage.removeItem("user");
        }
    },[])

    const login = (userData) => {
        localStorage.setItem("user",JSON.stringify(userData));
        setUser(userData);
    }

    const logout = ()=>{
        localStorage.removeItem("user");
        setUser(null);
        Api.get("logout").then((res)=>{
            setUser(null);
            navigate("/",{state: {message: "Sessão terminada com sucesso", typeMessage: "success"}});
        }).catch((er)=>{
            console.log("Houve um erro ao terminar sessão: "+er);
        })
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}