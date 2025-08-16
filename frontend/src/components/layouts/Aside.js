import { useContext } from 'react';
import style from './Aside.module.css'
import { AuthContext } from '../AuthContext/AuthContext';

function Aside(){
    const {user, logout} = useContext(AuthContext);
    
    const useLogout = ()=>{
        logout();
    }
    return(
        <>
            {user && (
                <aside className={style.aside_container}>
                    <div className={style.block_space}>

                    </div>
                    <div>
                        <button onClick={useLogout}>Terminar Sessão</button>
                    </div> 
                </aside>
            )}
        </>
        
    )
}

export default Aside