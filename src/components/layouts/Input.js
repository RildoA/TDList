import style from './Input.module.css'

function Input({labelText, placeholder, name, type, handleChange, value}){

    return(
        <div className={style.input_container}>
            <label>{labelText}:</label>
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={handleChange}/>
        </div>
    )
}

export default Input