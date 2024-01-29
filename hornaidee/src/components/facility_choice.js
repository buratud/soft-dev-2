import Checkbox from '@mui/material/Checkbox';

function Facility_choice (props) {
    const {dormData,setDormData} = props

    const check = (event) => {
        const {name,checked} = event.target;
        console.log(name,checked)
        setDormData((prevDorm) => {
            return {
                ...prevDorm,
                [name] : checked ? 1:0
            }
        })
    }
    
    return (
        <div>
            <div className="flex items-center">
            <Checkbox  name='water_heater' checked={!!dormData.water_heater} onChange={check}/>
                <p className=" text-lg">เครื่องทำน้ำอุ่น</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='TV' checked={!!dormData.TV} onChange={check}/>
                <p className=" text-lg">TV</p>
            </div>
            <div className="flex items-center">
            <Checkbox name='air' checked={!!dormData.air} onChange={check}/>
                <p className=" text-lg">แอร์</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='fridge' checked={!!dormData.fridge} onChange={check}/>
                <p className=" text-lg">ตู้เย็น</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='bike' checked={!!dormData.bike} onChange={check}/>
                <p className=" text-lg">ที่จอดรถมอเตอร์ไซต์</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='car' checked={!!dormData.car} onChange={check}/>
                <p className=" text-lg">ที่จอดรถยนต์</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='fitness' checked={!!dormData.fitness} onChange={check}/>
                <p className=" text-lg">fitness</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='washer' checked={!!dormData.washer} onChange={check}/>
                <p className=" text-lg">เครื่องซักผ้า</p>
            </div>
            <div className="flex items-center">
            <Checkbox  name='pool' checked={!!dormData.pool} onChange={check}/>
                <p className=" text-lg">สระว่ายน้ำ</p>
            </div>
        </div>
    )
}

export default Facility_choice;