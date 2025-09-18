import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Searchbar from "./Searchbar";
import PostIdea from "./PostIdea";
import Notification from "./Notification";
import Chat from "./Chat";
import User from "./User";

const Navbar = () => { 
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="flex items-center justify-between px-6 py-2 text-white shadow-md animated-gradient">
      <Link to="/" className="text-xl font-bold tracking-wide">
        Collab Space
      </Link>

      {user && <Searchbar />}

      <div className="flex items-center gap-3 relative">
        {user ? (
          <>  
            <PostIdea />
            <Notification />
            <Chat />
            <User />
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-medium hover:bg-gray-100"
          >
            Sign In / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
