import "../App.css"
import { useState } from "react"
import Card from "../components/Card"
import CreateContent from "../components/CreateContent"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>

            <div>
                <Sidebar />
            </div>
            <Navbar setModalOpen={setModalOpen} />
            <div className='ml-60 min-h-screen bg-[#eeeeef] '>


                <div className='flex gap-4 pt-20'>
                    <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />
                    <Card title="Ochi bolte" type="twitter" link='https://x.com/Beluga_69_69/status/1883555882447090143' />
                    <Card title="Ochi bolte" type="youtube" link='https://www.youtube.com/watch?v=DW8QbuYSlHw' />

                </div>
            </div>
        </div>
    )
}

export default Dashboard