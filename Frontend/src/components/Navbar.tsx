import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import BrainIcon from "../assets/Brain.png"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { BACKEND_URL, FRONTEND_URL } from "../config";
function Navbar({ setModalOpen }) {
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
    async function shareBrain() {

        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        const shareUrl = `${FRONTEND_URL}${response.data.message}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            //@ts-ignore
            progressStyle: {
                backgroundColor: '#3b82f6'
            }
        });
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
            <div className="flex gap-4 items-center">
                <Button onClick={() => setModalOpen(true)} startIcon={<ShareIcon size="sm" />} size="sm" text='Add Content' varient='primary' />
                <Button onClick={() => shareBrain()} startIcon={<PlusIcon size="md" />} size='sm' text='Share Brain' varient='secondary' />

            </div>

        </motion.nav>
    )
}

export default Navbar