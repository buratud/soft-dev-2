
import "./card_preview.scoped.css"
function Card_previwe(props){
    const {dorm} = props
    return(
        <div className="card_preview">
            <div className="image_preview relative">
                <img src={dorm.url?JSON.parse(dorm.url)[0].url:""}/>
                
            </div>
            <div className="info">
                <h6 className="Dorm_name">{dorm.dorm_name}</h6>
                <p className="price_info">{dorm.min_price?.toLocaleString('en-US')} - {dorm.max_price?.toLocaleString('en-US')} บาท/เดือน</p>
                <p className="Distance">ระยะห่างจากมอ:{dorm.distance} ม.</p>
            </div>
        </div>
    )
}

export default Card_previwe