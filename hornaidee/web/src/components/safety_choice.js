import Checkbox from '@mui/material/Checkbox';

function Safety_choice (props) {
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
            <Checkbox name='dorm_key' checked={!!dormData.dorm_key} onChange={check}/>
                <p className=" text-lg">กุญแจ</p>
            </div>
            <div className="flex items-center">
            <Checkbox name='key_card' checked={!!dormData.key_card} onChange={check}/>
                <p className=" text-lg">คีย์การ์ด</p>
            </div>
            <div className="flex items-center">
            <Checkbox name='camera' checked={!!dormData.camera} onChange={check}/>
                <p className=" text-lg">กล้องวงจรปิด</p>
            </div>
            <div className="flex items-center">
            <Checkbox name='guard' checked={!!dormData.guard} onChange={check}/>
                <p className=" text-lg">รปภ.</p>
            </div>
            <div className="flex items-center">
            <Checkbox name='finger_print' checked={!!dormData.finger_print} onChange={check}/>
                <p className=" text-lg">สแกนลายนิ้วมือ</p>
            </div>
        </div>
    )
}

export default Safety_choice;