import { useRef, useState } from "react"
import CrossIcon from "../icons/CrossIcon"
import { Button } from "./ui/Button"
import Input from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}

function CreateContent({ open, onClose }) {
    const titleRef=useRef<HTMLInputElement>();
    const linkRef=useRef<HTMLInputElement>();
    const [type,setType]=useState(ContentType.Youtube);

    async function addContent(){
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        onClose();
    }
    return (
        <div>
            {open && <div className="w-screen h-screen top-0 left-0 flex justify-center items-center   fixed bg-black/50 backdrop-blur-sm ">
                <div className=" bg-white px-4 pb-2 pt-1 rounded-md">
                    <div onClick={onClose} className="w-full flex justify-end pt-2 text-red-600 cursor-pointer"><CrossIcon size="md" /></div>
                    <div>
                        <Input reference={titleRef} placeholder={"Title"} />
                        <Input reference={linkRef} placeholder={"Link"} />
                        <div>
                            <div className="mt-1">
                                <h1 className="text-md">Select Type:</h1>
                            </div>
                            <div className="w-full flex justify-between items-center my-3 ">
                            <Button size="sm" text="Youtube" varient={type===ContentType.Youtube?"primary":"secondary"} onClick={()=>{setType(ContentType.Youtube)}}   />
                            <Button size="sm" text="Twitter" varient={type===ContentType.Twitter?"primary":"secondary"} onClick={()=>{setType(ContentType.Twitter)}}   />
                        </div>
                        </div>
                        <Button onClick={addContent} varient="primary" size="sm" text="Submit" className={"w-full"} />
                    </div>
                </div>
            </div>}
        </div>
    )
}



export default CreateContent