import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./input";
import Posts from "./Posts";

const MainScreen = () => {
  const [posts, setposts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")),
        (snapshot) => {
          // console.log(snapshot.docs);
          setposts(snapshot.docs);
        }
      ),
    [db]
  );

  // console.log(posts);
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-3 text-xl flex justify-between sticky top-0 items-center">
        <div>Home</div>
        <div className="cursor-pointer">
          <HiOutlineSparkles size={20} />
        </div>
      </div>
      <div className="h-full overflow-y-auto no-scrollbar p-2">
        <Input />
        {posts.map((post) => (
          <Posts key={post.id} id={post.id} postsdata={post.data()} />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
