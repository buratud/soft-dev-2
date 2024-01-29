
import "./card.scoped.css"

function Distance(distance){
    if(distance >= 1000){
        return distance/1000 + " กม."
    } else {
        return distance + " ม."
    }
}


function Card(props){
    const {dorm} = props

    return(
        <div className="card">
            <div className="image"><img src={dorm.url?JSON.parse(dorm.url)[0].url:""}/></div>
            <div className="info">
                <h6 className="Dorm_name">{dorm.dorm_name}</h6>
                <p className="price_info">{dorm.min_price.toLocaleString('en-US')} - {dorm.max_price.toLocaleString('en-US')} บาท/เดือน</p>
                <p className="Distance">ระยะห่างจากมอ: {Distance(dorm.distance)}</p>
            </div>
        </div>
    )
}

export default Card