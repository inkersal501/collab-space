import { IoCloseCircleOutline } from "react-icons/io5"; 

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-full z-50">
 
      <div
        className="absolute inset-0 bg-transparant bg-opacity-50"
        onClick={onClose} 
      ></div>

      {/* Modal content */}
      <div className="relative p-6 h-auto w-auto z-10 flex justify-center items-center"> 
        <button onClick={onClose} 
          className="absolute top-10 right-10 rounded-full p-2 text-gray-400 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:opacity-90"
          
        >
          <IoCloseCircleOutline size={30} />
        </button>
        {children}
      </div>
    </div>
  );
}
