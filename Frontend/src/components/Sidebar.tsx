import { useNavigate } from "react-router-dom"
import LogoutIcon from "../icons/LogoutIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"
import { ToastContainer, toast } from 'react-toastify';

function Sidebar({ setType }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    toast.error("Log Out Successful, Redirecting!", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //@ts-ignore

      progressStyle: { backgroundColor: '#ef4444' }
    });
    setTimeout(() => { navigate("/signin"); }, 3500);
  }
  return (
    <div className='mt-20 h-screen bg-white border-r w-60 fixed left-0  top-0 space-y-3 pt-4 '>
      <SidebarItem onClick={() => setType("twitter")} text="Tweets" icon={<TwitterIcon />} />
      <SidebarItem onClick={() => setType("youtube")} text="Videos" icon={<YoutubeIcon />} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SidebarItem className="mt-88 " onClick={() => logout()} text="Log Out" icon={<LogoutIcon />} />

    </div>
  )
}

export default Sidebar