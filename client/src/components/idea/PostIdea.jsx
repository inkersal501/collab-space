import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function PostIdea({onClick}) {
    const { user } = useSelector((state) => state.auth);
        
    return (
        <div className='flex gap-2 items-center w-1/2 px-4 py-6 bg-gray-100 rounded-xl my-4'>
            {user?.avatar ? (
            <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
            />
            ) : (
            <FaUserCircle className="w-10 h-10 text-gray-500" />
            )}
            <div
                onClick={onClick}
                className='w-full py-2 px-4 border rounded-full border border-gray-400 cursor-pointer'>
                Post your idea..
            </div>
        </div>
    )
}

export default PostIdea