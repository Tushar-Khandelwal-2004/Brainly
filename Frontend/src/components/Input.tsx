interface InputProps {
    placeholder: string, 
    reference?: any, 
    className?: string
}
const Input = ({placeholder,reference,className}:InputProps) => {
    return (
        <div>
            <input ref={reference} type="text" placeholder={placeholder} className={`px-4 py-2 rounded-md my-2 ${className}`} />
        </div>
    )
}
export default Input;