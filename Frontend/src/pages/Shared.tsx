import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import NavbarShared from "../components/NavbarShared";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Shared() {
    const [username, setUsername] = useState("");
    const [content,setContent]=useState([]);
    const { shareId } = useParams();
    console.log(shareId);
    async function getData() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContent(response.data.content);
        setUsername(response.data.username)
        console.log(username);
    }
    useEffect(() => {
        getData();
    }, [shareId]);

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <NavbarShared name={username} />
            <div className='ml-60  bg-[#eeeeef]  '>
                <div className='max-w-full pl-4  min-h-screen overflow-hidden flex flex-wrap gap-4 pt-20'>
                {content.map(({type,title,link})=><Card title={title} type={type} link={link} />)} 
                </div>
            </div>

        </div>
    )
}

export default Shared