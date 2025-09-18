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
        <div className="relative flex mb-6">
          <h1 className="text-3xl font-semibold">{tab === "login" ? "Sign In": "Sign Up"}</h1>
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
      <div className="mt-4">
        {tab === "login" ? 
        <div>
          <span className="me-0">New here? </span>
          <button
            onClick={() => setTab("register")}
            className="py-1 px-2 font-medium cursor-pointer text-indigo-800 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:opacity-90"
          >
            Sign Up
          </button>
        </div>
        :
        <div>
          <span className="me-0">Already on Collab Space? </span>
          <button
            onClick={() => setTab("login")}
            className="py-1 px-2 font-medium cursor-pointer text-indigo-800 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:opacity-90" 
          >
            Sign In
          </button>
        </div>
        }
      </div>
    </div>
  );
};

export default Auth;
