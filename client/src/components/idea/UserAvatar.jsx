import { FaUserCircle } from "react-icons/fa";
import { formatDateTime } from "@utils/custom";

function UserAvatar({postedBy, createdAt}) {
  return (
    <div className="flex items-center gap-3">
        {postedBy?.avatar ? (
        <img
            src={postedBy.avatar}
            alt={postedBy.username}
            className="w-10 h-10 rounded-full object-cover"
        />
        ) : (
        <FaUserCircle className="w-10 h-10 text-gray-500" />
        )}
        <div>
        <p className="font-semibold">{postedBy?.username || "Anonymous"}</p>
        <p className="text-xs text-gray-500">
            {formatDateTime(new Date(createdAt))}
        </p>
        </div>
    </div>
  )
}

export default UserAvatar;