import { signIn } from "next-auth/react";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="bg-[#1C9AEB]">
        <div className="flex h-full justify-center items-center">
          <FaTwitter size={100} className="text-white" />
        </div>
      </div>
      <div className="bg-black">
        <div className="h-full flex items-center justify-center  " onClick={()=>signIn('google')}>
          <button className="bg-white flex items-center p-2 rounded-lg "><FcGoogle size={30} className="mr-4" />Signin With Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
