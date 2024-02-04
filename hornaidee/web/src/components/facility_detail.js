import {
    AcUnit,
    Tv,
    Kitchen,
    PedalBike,
    AirportShuttle,
    Pool,
    FitnessCenter,
    LocalLaundryService,
    Shower,
  } from "@mui/icons-material";

function FacilityDetail(props){
    const {dorm} = props
    return (
        <div  className="grid facility grid-cols-2 mx-8 mt-2 gap-y-2.5">
            {dorm.water_heater?<div className="flex">
            <Shower></Shower>
            <p className="ml-2">เครื่องทำน้ำอุ่น</p>
            </div>:undefined}

            {dorm.air?<div className="flex">
            <AcUnit></AcUnit>
            <p className="ml-2">เครื่องปรับอากาศ</p>
            </div>:undefined}

            {dorm.TV?<div className="flex">
            <Tv></Tv>
            <p className="ml-2">TV</p>
            </div>:undefined}

            {dorm.fridge?<div className="flex">
            <Kitchen></Kitchen>
            <p className="ml-2">ตู้เย็น</p>
            </div>:undefined}

            {dorm.bike?<div className="flex">
            <PedalBike></PedalBike>
            <p className="ml-2">ที่จอดรถจักรยานยนต์</p>
            </div>:undefined}

            {dorm.car?<div className="flex">
            <AirportShuttle></AirportShuttle>
            <p className="ml-2">ที่จอดรถยนต์</p>
            </div>:undefined}

            {dorm.fitness?<div className="flex">
            <FitnessCenter></FitnessCenter>
            <p className="ml-2">fitness</p>
            </div>:undefined}

            {dorm.washer?<div className="flex">
            <LocalLaundryService></LocalLaundryService>
            <p className="ml-2">เครื่องซักผ้า</p>
            </div>:undefined}
            
            {dorm.pool?<div className="flex">
            <Pool></Pool>
            <p className="ml-2">สระว่ายน้ำ</p>
            </div>:undefined}
        </div>
    )
}

export default FacilityDetail