import { useContext } from "react"
import {AuthContext} from './AuthContext/AuthContext'
import { Navigate } from "react-router-dom";


function PrivateRoute({children}){

    const {user} = useContext(AuthContext);

    if(!user){
            return (
                <Navigate to="/" state={{message: "Você precisa ter a sua sessão iniciada", typeMessage:"error"}}
                replace/>
        )
    }

    return children
}

export default PrivateRoute