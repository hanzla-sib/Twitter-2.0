import Login from "@/Components/Login";
import MainScreen from "@/Components/MainScreen";
import { useSession } from "next-auth/react";
import Sidebar from "@/Components/Sidebar";
import Notifications from "@/Components/Notifications";
export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <Login />;
  }
  return (
    <div className="max-w-[1640px] flex flex-row text-white bg-black h-screen  ">
      <div className="basis-1/5 md:basis-2/5 lg:basis-60 border-r border-gray-500 overflow-y-auto no-scrollbar  ">
        <Sidebar />
      </div>
       <div className="basis-full lg:basis-3/5 border-r lg:border-gray-500">
        <MainScreen />
      </div>
      <div className="basis-1/5 hidden lg:block">
        <Notifications />
      </div> 
    </div>
  );
}
