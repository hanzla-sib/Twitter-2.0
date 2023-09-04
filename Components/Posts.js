import React, { useState } from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { db } from "@/Firebase";
import { BiMessageRounded } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
const Posts = ({ id, postsdata }) => {
  const router = useRouter();
  const [totallikes, settotallikes] = useState([]);
  const [currentlike, setcurrentlike] = useState(false);
  
  const deletepost = async (postId) => {
    try {
      const postRef = doc(collection(db, "posts"), postId);
      await deleteDoc(postRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    // <div onClick={()=>router.push(`/${id}`)}>
    <div className="flex border-gray-600 border-t-2 mt-2 p-4 ">
      <div className="w-12 ">
        <img className="rounded-full" src={postsdata?.userimg} />
      </div>
      <div className="flex flex-col ml-3 w-full sm:w-[400px] md:w-[500px] xl:w-[500px]">
        <div>{postsdata?.username}</div>
        <div className="text-gray-500 text-sm">
          @{postsdata?.tag} -{" "}
          <Moment fromNow>{postsdata?.timeStamp?.toDate()}</Moment>
        </div>
        <div className="text-sm">{postsdata?.text}</div>
        <div className="mt-4 rounded-2xl p-2">
          <img className="rounded-2xl" src={postsdata?.image} />
        </div>
        <div className="flex justify-around items-center mt-6">
          <div className="group flex items-center">
            <BiMessageRounded size={20} className="group-hover:scale-125" />
            <p className="ml-1">3</p>
          </div>
          <div
            className="group"
            onClick={(e) => {
              deletepost(id);
            }}
          >
            <MdDeleteOutline size={20} className="group-hover:scale-125" />
          </div>
          <div
            className="group flex items-center"
            onClick={(e) => {
              setcurrentlike(!currentlike);
            }}
          >
            {currentlike && (
              <FcLike
                size={20}
                className="group-hover:scale-125 text-red-700 "
              />
            )}
            {!currentlike && (
              <AiOutlineHeart size={20} className="group-hover:scale-125" />
            )}
            <p className="ml-1">3</p>
          </div>
          <div className="group">
            <AiOutlineShareAlt size={20} className="group-hover:scale-125" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
