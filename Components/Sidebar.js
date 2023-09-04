import React from "react";
import { FaTwitter, FaHashtag } from "react-icons/fa";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { RiNotificationFill } from "react-icons/ri";
import { BsFillBookmarkPlusFill, BsListCheck } from "react-icons/bs";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();

  if(session){
    console.log(session)
  }
  return (
    <div className="flex flex-col  md:ml-10 md:gap-10">
    <div className="flex flex-col mt-4  space-y-10">
      <div className="group flex justify-center md:justify-start cursor-pointer">
        <FaTwitter className="group-hover:scale-75" size={30} />
      </div>
      <div className="group flex items-center justify-center md:justify-start space-x-2 cursor-pointer">
        <AiFillHome className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Home</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <FaHashtag className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Explore</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <RiNotificationFill className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Notifications</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <AiFillMessage className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Messages</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <BsFillBookmarkPlusFill className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Bookmarks</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <BsListCheck className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Lists</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
        <CgProfile className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">Profile</p>
      </div>
      <div className="group flex items-center space-x-2 justify-center md:justify-start cursor-pointer ">
        <CgMoreO className="group-hover:scale-75" size={20} />
        <p className="hidden md:block">More</p>
      </div>
      <div className="flex items-center space-x-1 justify-center md:justify-start ">
        <div className="bg-[#1C9AEB] rounded-full">
          <button className="px-2 md:px-8 lg:px-12 xl:px-10 py-1 md:py-2">Tweet</button>
        </div>
      </div>
      </div>
      <div className="mt-5 sm:mt-0 ">
        <div className="  flex flex-col md:flex-row justify-center md:justify-start items-center space-y-4  md:space-x-2 md:space-y-0">
        {session?<img className="h-10 w-10 rounded-full hover:scale-125 cursor-pointer" onClick={()=>signOut("google")} src={session.user.image}/>:""}
        {session?<h1 className="text-gray-400 text-xs">@{session.user.tag}</h1>:""}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
