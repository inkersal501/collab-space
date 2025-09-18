import { FaComment, FaShare, FaUsers, FaEllipsisH } from "react-icons/fa";

import { useState } from "react"; 
import Comments from "./Comments";
import UserAvatar from "./UserAvatar";
import Like from "./Like";

function IdeaCard({ idea }) { 
   
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(idea.comments || []); 
    
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-xl">
      
      <div className="flex justify-between items-start">
        <UserAvatar postedBy={idea.postedBy} createdAt={idea.createdAt}/>
        <button className="text-gray-500 hover:text-gray-700">
          <FaEllipsisH />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-gray-800">{idea.idea}</p>
      </div>
 
      {/* Actions */}
      <div className="flex justify-between items-center mt-4 text-gray-600">
        <div className="flex justify-start items-center gap-4">

          <Like ideaId={idea._id} ideaLikes={idea.likes.length} />
          
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowComment(!showComment)}>
            <FaComment />
            <span>{comments.length}</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button className="flex items-center gap-1 hover:text-purple-500">
            <FaUsers /> <span>{idea.collaborators?.length || 0}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-green-500">
            <FaShare /> <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComment && (
        <Comments ideaId={idea._id} comments={comments} setComments={setComments} />
      )}
    </div>
  );
}

export default IdeaCard;
