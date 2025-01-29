import "../App.css"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import CreateContent from "../components/CreateContent"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import useContent from "../hooks/useContent"

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)
    const {contents,refresh}=useContent();
    useEffect(()=>{refresh()},[modalOpen]);
    return (
        <div>

            <div>
                <Sidebar />
            </div>
            <Navbar setModalOpen={setModalOpen} />
            <div className='ml-60  bg-[#eeeeef]  '>


                <div className='max-w-full pl-4  min-h-screen overflow-hidden flex flex-wrap gap-4 pt-20'>
                    {contents.map(({type,title,link})=><Card title={title} type={type} link={link} />)}
                    <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />

                    {/* <Card title="Ochi bolte" type="twitter" link='https://x.com/Beluga_69_69/status/1883555882447090143' />
                    <Card title="Ochi bolte" type="youtube" link='https://www.youtube.com/watch?v=DW8QbuYSlHw' /> */}

                </div>
            </div>
        </div>
    )
}

export default Dashboard