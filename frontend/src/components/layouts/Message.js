import { useEffect, useState } from 'react'
import style from './Message.module.css'

function Message({message, typeMessage}){

    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(!message){
            setVisible(false);
            return
        }

        setVisible(true)

        setTimeout(()=>{
            setVisible(false)
        },3000)
        
    },[message])


    return(
        <>
            {visible && ( 
                <div className={`${style.message} ${style[typeMessage]}`}>
                    <p>{message}</p>
                </div>
            )
                
            }
        </>
    )
}
export default Message