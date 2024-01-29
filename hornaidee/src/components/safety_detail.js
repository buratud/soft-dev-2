import {
    Key,
    CreditCard,
    Videocam,
    Security,
    Fingerprint,
  } from "@mui/icons-material";

function SafetyDetail(props){
    const {dorm} = props
  return (
    <div className="grid facility grid-cols-2 mx-8 mt-2 gap-y-2.5">
        {dorm.dorm_key?<div className="flex">
        <Key></Key>
        <p className="ml-2">กุญแจ</p>
        </div>:undefined}

        {dorm.key_card?<div className="flex">
        <CreditCard></CreditCard>
        <p className="ml-2">คีย์การ์ด</p>
        </div>:undefined}

        {dorm.camera?<div className="flex">
        <Videocam></Videocam>
        <p className="ml-2">กล้องวงจรปิด</p>
        </div>:undefined}

        {dorm.guard?<div className="flex">
        <Security></Security>
        <p className="ml-2">รปภ.</p>
        </div>:undefined}

        {dorm.finger_print?<div className="flex">
        <Fingerprint></Fingerprint>
        <p className="ml-2">ลายนิ้วมือ</p>
        </div>:undefined}

    </div>
  )
}

export default SafetyDetail;