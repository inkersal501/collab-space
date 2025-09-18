import { IoIosChatbubbles } from "react-icons/io";

function Chat() {
  return (
    <div className="relative">
        <button className="px-2 py-2 rounded-full hover:bg-indigo-500/40">
        <IoIosChatbubbles color="#fff" size={24}/>
        </button>
    </div>
  )
}

export default Chat;