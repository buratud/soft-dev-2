import "./bt1.scoped.css"
function Bt1(props){
    let {children, Width, classname,onChange,Height} = props
    return(
        <button onChange={onChange} onClick={onChange} style={{width:Width??'100px',height:Height??'35px'}} className={classname}>{children}</button>
    )
}
export default Bt1;