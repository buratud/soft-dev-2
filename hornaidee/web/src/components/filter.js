import "./filter.scoped.css"
import { useState } from "react";
function Filter(props){
    const {section, children} = props
    const [ filterStatus , setFilterStatus] = useState(false);
    const openFilter = () => setFilterStatus(!filterStatus)
    
    return(
        <div className="filter">
            <div className="Head">
                <h5 className="section">{section}</h5>
                <img className="plus" src={filterStatus?"/img/minus.png":"/img/Vector.png"} onClick={openFilter}></img>
            </div>
            <div className="Body" style={filterStatus ? {height: (children.length*24)+"px"} : {height:"0"}}>
                {children}
            </div>
        </div>
    )
}
export default Filter;
