import "./bt2.scoped.css"
function Bt2(props){
    let {children, Width ,classname,onChange,Height} = props
    return(
        <button onChange={onChange} onClick={onChange} style={{width:Width??'100px',height:Height??'35px'}} className={classname}>{children}</button>
    )
}
export default Bt2;