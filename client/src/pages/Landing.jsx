import React, { useEffect, useState } from 'react'
import List from '@components/idea/List'
import PostIdea from '@components/idea/PostIdea'
import CreateIdeaForm from '@components/idea/CreateIdeaForm';
import Modal from '@components/common/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
function Landing() {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{ 
    if(!user || !user.username){
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full'>
        <PostIdea onClick={() => setIsModalOpen(true)}/>
        <div className="divider h-[1px] bg-gray-300 w-1/2"></div>
        <List/>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          
            <CreateIdeaForm isModal={true} closeModal={()=>setIsModalOpen(false)}/>
   
        </Modal>
      </div>
      
    </>
  )
}

export default Landing