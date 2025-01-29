import { useRef } from "react";
import Input from "../components/Input"
import { Button } from "../components/ui/Button"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate=useNavigate();
    async function submit() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response=await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });
        const jwt=response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard");
    }
    return (
        <div className="flex justify-center items-center bg-gray-200  h-screen w-screen">
            <div className="bg-white rounded border border-slate-400 min-w-48 px-4 py-4 space-y-2">
                <div className="flex justify-center text-xl font-semibold mb-4  ">
                    <h1>Sign In</h1>
                </div>
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} className="mb-4" placeholder="Password" />
                <Button onClick={submit} loading={false} size="md" varient="primary" text="Submit" className="w-full " />
            </div>
        </div>
    )
}

export default Signin