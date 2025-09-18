import { useEffect, useState } from "react";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";  
import GoogleAuth from "@components/auth/GoogleAuth";
import { useSelector } from "react-redux";  
import { useNavigate } from "react-router-dom";

const Auth = () => {
 
  const [tab, setTab] = useState("login");
  const {user} =  useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6">
      <div className="p-8 rounded-2xl w-full max-w-md mx-auto border border-gray-300">
        
        {/* Tabs switch */}
        <div className="relative flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`w-1/2 py-2 font-medium transition-all duration-300 cursor-pointer ${
              tab === "login" ? "text-indigo-600" : "text-gray-500 hover:text-indigo-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`w-1/2 py-2 font-medium transition-all duration-300 cursor-pointer ${
              tab === "register" ? "text-indigo-600" : "text-gray-500 hover:text-indigo-400"
            }`}
          >
            Register
          </button>
 
          <span
            className={`absolute bottom-0 h-[2px] bg-indigo-600 transition-all duration-300 ease-in-out ${
              tab === "login" ? "left-0 w-1/2" : "left-1/2 w-1/2"
            }`}
          />
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {tab === "login" ? (
            <Login />
          ) : (
            <Register switchTab={() => setTab("login")} />
          )}

          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Auth;
