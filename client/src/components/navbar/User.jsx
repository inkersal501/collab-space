import { Link } from "react-router-dom";
import { logout } from "@store/authSlice";
import { useDropdown } from "@hooks/useDropdown";  
import { authService } from "@services/index";
import { useSelector, useDispatch } from "react-redux"; 
import { HiOutlineLightBulb, HiOutlineLogout } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa"; 
import { toast } from 'react-toastify';

function User() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
   
  const userDropdown = useDropdown();

  const handleLogout = async () => {
    const status = await authService.logout();
    if (status) {
      toast.success("Sign out successfully!");
      dispatch(logout());
      userDropdown.close();
    }
  };

  return (
    <div className="relative" ref={userDropdown.ref}>
      <button
        onClick={userDropdown.toggle}
        className="font-medium px-3 py-2 rounded-lg hover:bg-indigo-500/40 flex items-center gap-2"
      > 
        {!user.avatar ? <FaUserCircle size={20} /> : <img src={user.avatar} className="w-[25px] h-[25px] rounded-full object-cover" />}
        <span>{user.username}</span>
      </button>
      {userDropdown.open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          
          <Link
            to="/idea/my-ideas"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          >
            <HiOutlineLightBulb size={20} /> My Ideas
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          >
            <HiOutlineLogout size={20} /> Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default User;