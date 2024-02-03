
function Choice(props){
    const {children,Check,price,distance} = props
    return(
        <p><input type="checkbox" className="mr-1" onChange={() =>{
            Check(price,distance)
        }}/>{children}</p>
    )
}

export default Choice;