import Input from "../components/Input"
import { Button } from "../components/ui/Button"

function Signin() {
    return (
        <div className="flex justify-center items-center bg-gray-200  h-screen w-screen">
            <div className="bg-white rounded border border-slate-400 min-w-48 px-4 py-4 space-y-2">
                <div className="flex justify-center text-xl font-semibold mb-4  ">
                    <h1>Sign In</h1>
                </div>
                <Input placeholder="Username" />
                <Input className="mb-4" placeholder="Password" />
                <Button size="md" varient="primary" text="Submit" className="w-full " />
            </div>
        </div>
    )
}

export default Signin