import { useState } from "react"
import CrossIcon from "../icons/CrossIcon"
import { Button } from "./ui/Button"
import Input from "./Input"

function CreateContent({ open, onClose }) {
    return (
        <div>
            {open && <div className="w-screen h-screen top-0 left-0 flex justify-center items-center   fixed bg-black/50 backdrop-blur-sm ">
                <div className=" bg-white px-4 pb-2 pt-1 rounded-md">
                    <div onClick={onClose} className="w-full flex justify-end pt-2 text-red-600 cursor-pointer"><CrossIcon size="md" /></div>
                    <div>
                        <Input placeholder={"Title"} />
                        <Input placeholder={"Link"} />
                        <Button varient="primary" size="sm" text="Submit" className={"w-full"} />
                    </div>
                </div>
            </div>}
        </div>
    )
}



export default CreateContent