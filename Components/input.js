import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FcAddImage } from "react-icons/fc";
import { RiFileGifLine } from "react-icons/ri";
import { BsEmojiSmile, BsFillCalendarDateFill } from "react-icons/bs";
import { TfiGallery } from "react-icons/tfi";
import { BiPoll } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import data from "@emoji-mart/data";

import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/Firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const Input = () => {
  const [input, setinput] = useState("");
  const [loading, setloading] = useState(false);
  const { data: session } = useSession();
  const [image, setimage] = useState(null);
  const [emojibox, setemojibox] = useState(false);
  const [dataupload, setdataupload] = useState(false);

  const [successloader, setsucessloader] = useState(false);
  const Addimage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerevent) => {
      setimage(readerevent.target.result);
      setloading(true);
    };
  };

  const handleClickOutside = () => {
    if (emojibox === true) {
      setemojibox(false);
    }
  };

  const concatemoji = (e) => {
    console.log(e.native);
    setinput(input + e.native);
  };

  const sendpost = async (e) => {
    if (dataupload === true) {
      return;
    }
    setdataupload(true);
    if (input === "" && image === null) {
      alert("either write text or select image");
      return;
    }

    setsucessloader(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userimg: session.user.image,
      email: session.user.email,
      tag: session.user.tag,
      text: input,
      timeStamp: serverTimestamp(),
    });

    const imageref = ref(storage, `posts/${docRef.id}/image`);
    if (image !== null) {
      console.log(image);
      await uploadString(imageref, image, "data_url").then(async () => {
        const downloadurl = await getDownloadURL(imageref);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadurl,
        });
        setsucessloader(false);
      });
    } else {
      setsucessloader(false);
    }

    if (!successloader) {
      setloading(false);
      setimage(null);
      setinput("");
      setdataupload(false);
      setsucessloader(false);
    }
  };
  return (
    <div className="w-full flex space-x-6 p-2 relative">
      <div className="rounded-full w-12 h-12">
        <img className="rounded-full" src={session?.user?.image} />
      </div>
      <div>
        <div className="h-full flex flex-col w-full sm:w-[400px] md:w-[500px] xl:w-[500px] space-y-3 ">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Whats Happening ?"
            className="w-full text-lg bg-transparent outline-none text-gray-400 "
            style={{ whiteSpace: "normal" }} // Add this line
          />

          {loading && (
            <div className="w-full rounded-2xl flex relative ">
              <div className="w-[230px] sm:w-[400px] md:w-[450px] xl:w-full shadow-2xl ">
                <img
                  className="w-max   rounded-2xl object-contain"
                  src={image}
                />
              </div>
              <ImCancelCircle
                onClick={(e) => (setloading(false), setimage(null))}
                size={30}
                className="text-black absolute top-1 left-1 cursor-pointer"
              />
            </div>
          )}
          {successloader && (
            <div className="flex flex-col justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="">Loading...</span>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between xl:px-6 space-y-4 md:space-y-0">
            <div className="flex gap-2 md:gap-4 lg:gap-6 items-center space-between text-[#1C9AEB]">
              <label htmlFor="file">
                <TfiGallery
                  className="cursor-pointer"
                  size={20}
                  // onClick={(e) => setloading(true)}
                />
              </label>
              <input type="file" id="file" hidden onChange={Addimage} />
              <RiFileGifLine className="cursor-pointer" size={20} />
              <BiPoll className="cursor-pointer" size={20} />
              <BsEmojiSmile
                className="cursor-pointer"
                onClick={(e) => (e.stopPropagation(), setemojibox(true))}
                size={20}
              />

              <BsFillCalendarDateFill className="cursor-pointer" size={20} />
              <GoLocation className="cursor-pointer" size={20} />
            </div>
            <div className="bg-[#1C9AEB] rounded-full cursor-pointer ">
              <button
                className="px-2  md:px-8 lg:px-16 py-1 md:py-2 w-full"
                onClick={() => sendpost()}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      {emojibox && (
        <div className="absolute top-20">
          <div className="">
            <Picker
              data={data}
              onEmojiSelect={(e) => concatemoji(e)}
              onClickOutside={handleClickOutside}
            />
          </div>

          <ImCancelCircle
            size={20}
            className="text-blue-500 absolute top-1 right-0 cursor-pointer z-10"
            onClick={() => setemojibox(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
