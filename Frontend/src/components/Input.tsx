interface InputProps {
    placeholder: string, 
    reference?: any, 
    className?: string,
    type:string
}
const Input = ({placeholder,reference,className,type}:InputProps) => {
    return (
        <div>
            <input ref={reference} type={type} placeholder={placeholder} className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${className}`} />
        </div>
    )
}
export default Input;