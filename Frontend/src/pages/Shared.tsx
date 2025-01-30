import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import NavbarShared from "../components/NavbarShared";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Shared() {
    const [type, setType] = useState("");

    const [username, setUsername] = useState("");
    const [content, setContent] = useState([]);
    const [contents, setContents] = useState([]);

    const { shareId } = useParams();
    console.log(shareId);
    async function getData() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContents(response.data.content);
        setUsername(response.data.username)
        console.log(username);
    }
    useEffect(() => {
        getData();
    }, [shareId]);
    useEffect(() => {
        //@ts-ignore
        const filteredContent = contents.filter((item) => item.type === type);
        setContent(filteredContent);
    }, [type]);
    return (
        <div>
            <Sidebar setType={setType} />
            <NavbarShared name={username} />
            <div className='ml-60  bg-[#eeeeef]  '>
                <div className='max-w-full pl-4  min-h-screen overflow-hidden flex flex-wrap gap-4 pt-20'>
                    {content.length > 0 ? content.map(({ type, title, link }) => <Card title={title} type={type} link={link} />) : <div>Select Between Youtube and Twitter</div>}
                    {/* <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} /> */}

                    {/* {content.map(({ type, title, link }) => <Card title={title} type={type} link={link} />)} */}
                </div>
            </div>

        </div>
    )
}

export default Shared