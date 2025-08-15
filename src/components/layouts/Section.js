import style from './Section.module.css'

function Section({children}){
    return (
        <section className={style.section_container}>
            {children}
        </section>
    )
}

export default Section