import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { authService } from "@services";
import { login } from "@store/authSlice";
import { useDispatch } from "react-redux";

function GoogleAuth() {
  const dispatch = useDispatch();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const user = await authService.google_auth(idToken);

      if (user) {
        dispatch(login({ ...user }));
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="mt-6">
      {/* Divider with "or" */}
      <div className="flex items-center mb-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm font-medium">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Button Wrapper */}
      <div className="w-full flex justify-center">
        <div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
            size="large"
            theme="filled_blue"
            text="continue_with"
            ux_mode="popup"
          />
        </div>
      </div>
    </div>
  );
}

export default GoogleAuth;
