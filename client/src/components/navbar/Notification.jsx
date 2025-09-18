import React from 'react'
import { IoMdNotifications } from "react-icons/io";

function Notification() {
  return (
    <div className="relative">
        <button className="px-2 py-2 rounded-full hover:bg-indigo-500/40">
            <IoMdNotifications color="#fff" size={24}/>
        </button>
    </div>
  )
}

export default Notification