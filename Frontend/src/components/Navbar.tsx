import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import BrainIcon from "../assets/Brain.png"
import axios from "axios";
import { BACKEND_URL } from "../config";
function Navbar({setModalOpen}) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined && latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    })
    async function shareBrain(){
        
        const response=await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share:true
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        const shareUrl=`http://localhost:5173${response.data.message}`;
        alert(shareUrl); 
    }
    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed backdrop-blur  w-full px-12 py-4  flex justify-between items-center">
            <div className="flex justify-between items-center">
                <img className="size-10 " src={BrainIcon} alt="" />
                <div className="pl-2 text-3xl flex items-center pb-2">Brainly</div>
            </div>
            <div className="flex gap-4 items-center">
            <Button onClick={() => setModalOpen(true)} startIcon={<ShareIcon size="sm" />} size="sm" text='Add Content' varient='primary' />
            <Button onClick={()=>shareBrain()} startIcon={<PlusIcon size="md" />} size='sm' text='Share Brain' varient='secondary' />

            </div>

        </motion.nav>
    )
}

export default Navbar