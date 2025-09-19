import { useDropdown } from "@hooks/useDropdown";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import CreateIdeaForm from '../idea/CreateIdeaForm';
import Modal from '../common/Modal';
import { useState } from "react";

function PostIdea() {
  const plusDropdown = useDropdown();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative" ref={plusDropdown.ref}> 
      <button
        onClick={plusDropdown.toggle}
        className="px-2 py-2 rounded-full hover:bg-indigo-500/40 transition-transform duration-300 group"
      >
        <IoMdAddCircle
          color="#fff"
          size={24}
          className={`transition-transform duration-500 ${
            plusDropdown.open ? "rotate-45 scale-115" : ""
          }`}
        />
      </button>
 
      {plusDropdown.open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          <button
            onClick={() =>{ plusDropdown.toggle(); setIsModalOpen(true); }} 
            className="w-full block px-4 py-2 hover:bg-gray-100 text-start"
          >
            Post Idea
          </button>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>                
        <CreateIdeaForm isModal={true} closeModal={()=>setIsModalOpen(false)}/>  
      </Modal>
    </div>
  );
}

export default PostIdea;
