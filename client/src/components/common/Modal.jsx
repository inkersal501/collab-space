import { IoCloseCircleOutline } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-50">
 
      <div
        className="absolute inset-0 bg-transparant bg-opacity-50"
        onClick={onClose} 
      ></div>

      {/* Modal content */}
      <div className="relative bg-black/50 p-6 rounded-lg shadow-lg h-[100%] w-[100%] z-10 rounded-full flex justify-center items-center">
        <button
          className="absolute top-10 right-10 rounded-full p-2 text-white bg-gradient-to-r from-indigo-500 to-pink-500 opacity-90"
          onClick={onClose}
        >
          <IoCloseCircleOutline size={30}/>
        </button>
        {children}
      </div>
    </div>
  );
}
