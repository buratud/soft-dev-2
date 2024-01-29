import { Facebook,Instagram,LocalPhone,AlternateEmail } from "@mui/icons-material"

function Footer (){
  return (
    <div className="w-full bg-brown h-56 flex items-center">
        <img className="w-52 mx-8" src="/img/logologin.png"/>
        <div>
            <h1 className=" text-3xl mb-2 text-white">contact</h1>
            <p className="mb-1"><Facebook/>: hornaiD?</p>
            <p className="mb-1"><Instagram/>: hornaiD?</p>
            <p className="mb-1"><LocalPhone/>: 087-xxx-xxxx</p>
            <p><AlternateEmail/>: hornaiD@gmail.com</p>
        </div>
    </div>
  )
}

export default Footer

