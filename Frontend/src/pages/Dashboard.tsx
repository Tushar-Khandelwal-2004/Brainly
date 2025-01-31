import "../App.css";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import CreateContent from "../components/CreateContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useContent from "../hooks/useContent";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [type, setType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
        refresh();
    }, [modalOpen]);

    useEffect(() => {
        //@ts-ignore
        const filteredContent = contents.filter((item) => item.type === type);
        setContent(filteredContent);
    }, [type, contents]);
    function handleDelete(id: string) {
        //@ts-ignore
        setContent((prev) => prev.filter((item) => item._id !== id));
    }


    return (
        <div>
            <Sidebar setType={setType} />
            <Navbar setModalOpen={setModalOpen} />
            <div className="ml-60 pt-20 bg-[#eeeeef]">
                <div className="max-w-full pb-4 pl-4 min-h-screen overflow-hidden flex flex-wrap gap-4">
                    {content.length > 0 ? (
                        content.map((item, index) => (
                            //@ts-ignore
                            <Card key={index} contentId={item._id} onDelete={handleDelete} title={item.title} type={item.type} link={item.link} />
                        ))
                    ) : (
                        <div>Select Between Youtube and Twitter!! Kindly Refresh</div>
                    )}
                    <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
