import "../App.css"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import CreateContent from "../components/CreateContent"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import useContent from "../hooks/useContent"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [type, setType] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
    const { contents, refresh } = useContent();
    const [content, setContent] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
        refresh()
        // console.log(content)
    }, [modalOpen]);
    useEffect(() => {
        //@ts-ignore
        const filteredContent = contents.filter((item) => item.type === type);
        setContent(filteredContent);
    }, [type]);
    return (
        <div>

            <Sidebar setType={setType} />
            <Navbar setModalOpen={setModalOpen} />
            <div className='ml-60  bg-[#eeeeef]  '>


                <div className='max-w-full pl-4  min-h-screen overflow-hidden flex flex-wrap gap-4 pt-20'>
                    {content.length>0?content.map(({ type, title, link }) => <Card title={title} type={type} link={link} />):<div>Select Between Youtube and Twitter</div>}
                    <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />

                </div>
            </div>
        </div>
    )
}

export default Dashboard