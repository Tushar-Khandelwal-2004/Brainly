import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import BrainIcon from "../assets/Brain.png"

function NavbarShared({ name }: { name: String }) {
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
            {/* <div className="flex gap-4 items-center">
                <div className="pl-2 text-3xl flex items-center pb-2">{`${name}'s Brain`}</div>
            </div> */}
            <div className="flex gap-4 items-center">
                <div className="pl-2 text-3xl font-semibold text-gray-900 flex items-center pt-2">
                    <span className="text-blue-500">{`${name}'s`}</span>&nbsp;<span className="text-purple-600">Brain</span>
                </div>
            </div>
        </motion.nav>
    )
}

export default NavbarShared