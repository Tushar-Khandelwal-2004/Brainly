import React, { ReactElement } from 'react'
function SidebarItem({ text, icon,className }: {
    text: string,
    icon: ReactElement,
    className?:string
}) {
    return (
        <div className=' w-full px-4 '>
            <div className={`flex items-center px-4 cursor-pointer py-1 hover:bg-gray-200 rounded-md gap-4 transition-all duration-75 ${className}`}>
                <div className='fill-slate-600 text-slate-600 w-5'>
                    {icon}
                </div>
                <div>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default SidebarItem