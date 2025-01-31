import { useRef } from "react"
import Input from "../components/Input"
import { Button } from "../components/ui/Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function submit() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            if (!response.data.success) {
                toast.error(response.data.message || "Signup failed!", { // Show error toast
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    //@ts-ignore

                    progressStyle: { backgroundColor: '#ef4444' } // Red color for errors
                });
                return;
            }

            toast.success("Signup successful! Redirecting", { // Show success toast
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
//@ts-ignore

                progressStyle: { backgroundColor: '#3b82f6' }
            });

            setTimeout(() => {
                navigate("/signin");
            }, 3500)
        } catch (error) {
            console.error("Signup Error:", error);

            toast.error("Something went wrong. Please try again.", { // Show toast for Axios/network error
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
//@ts-ignore

                progressStyle: { backgroundColor: '#ef4444' }
            });
        }
    }



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>

                        <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" reference={usernameRef} type="text" placeholder="Username" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        {/* <input
                            type="password"
                            className="l"
                            placeholder="••••••••"
                        /> */}
                        <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" reference={passwordRef} type="password"  placeholder="••••••••" />

                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        {/* <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                    </div>

                    <button onClick={submit} className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Sign Up
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already an User? &nbsp;
                    <a onClick={() => navigate("/signin")} className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">Sign in</a>
                </div>
            </div>
        </div>
    )
}

export default Signup