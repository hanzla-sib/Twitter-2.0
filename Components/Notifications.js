import React from "react";
import { BsSearch } from "react-icons/bs";
const Notifications = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 ">
      <div className="lg:p-2 xl:p-4 flex bg-[#16171D] rounded-3xl items-center mt-4 w-full">
        <BsSearch size={20} />
        <input
          type="text"
          placeholder="Search Twitter"
          className="outline-none bg-transparent  ml-3"
        />
      </div>
      <div className="flex flex-col rounded-3xl w-full lg:p-2 xl:p-4 bg-[#16171D] mt-10">
      <h1 className="text-lg">Whats Happening!</h1>
      <div className="mt-4">
      <p className="text-gray-500">Entertainment - Live</p>
      <p>New Seasons Returns with Brand new Casts</p>
      </div>
      <div className="mt-4">
      <p className="text-gray-500">Entertainment - Live</p>
      <p>New Seasons Returns with Brand new Casts</p>
      </div>
      <div className="mt-4">
      <p className="text-gray-500">Entertainment - Live</p>
      <p>New Seasons Returns with Brand new Casts</p>
      </div>
      <div className="mt-4">
      <p className="text-gray-500">Entertainment - Live</p>
      <p>New Seasons Returns with Brand new Casts</p>
      </div>
      <div className="mt-4">
      <p className="text-gray-500">Entertainment - Live</p>
      <p>New Seasons Returns with Brand new Casts</p>
      </div>
  
      </div>
    </div>
  );
};

export default Notifications;
