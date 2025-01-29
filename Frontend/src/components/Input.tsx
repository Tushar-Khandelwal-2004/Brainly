const Input = ({ onChange, placeholder , className }: { placeholder: string,className?:string, onChange: () => void }) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} className={`px-4 py-2 rounded-md my-2 ${className}`} onChange={onChange} />
        </div>
    )
}
export default Input;