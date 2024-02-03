import "./message.scoped.css"

function MessageOwn (props){
    const {data} = props
  return (
      <div className="message flex m-3 flex-row-reverse">
          <img src="\img\banner.svg" className=" w-12 h-12 object-cover rounded-full mx-3"/>
          <p className="bg-cream p-2 rounded-md break-words block">{data.message_text}</p>
      </div>
  )
}

export default MessageOwn
