import DocumentIcon from "../icons/DocumentIcon"
import HashTagIcon from "../icons/HashTagIcon"
import LinkIcon from "../icons/LinkIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"

function Sidebar() {
  return (
    <div className='mt-20 h-screen bg-white border-r w-60 fixed left-0  top-0 space-y-3 pt-4'>
            <SidebarItem text="Tweets" icon={<TwitterIcon />}/>
            <SidebarItem text="Videos" icon={<YoutubeIcon />}/>
            <SidebarItem text="Documents" icon={<DocumentIcon />}/>
            <SidebarItem text="Links" icon={<LinkIcon />}/>
            <SidebarItem text="Tags" icon={<HashTagIcon />}/>
    </div>
  )
}

export default Sidebar