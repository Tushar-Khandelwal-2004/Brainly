import { ReactElement } from "react";

interface ButtonProps{
    varient:"primary"|"secondary",
    size:"sm"|"md"|"lg",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    className?:String,
    onClick:()=>void
}

const VarientStyles={
    "primary":"text-white bg-[#5046e4]",
    "secondary":"text-[#5046e4] bg-[#e0e7fe]"
}

const SizeStyles={
    "sm":"text-md",
    "md":"text-xl",
    "lg":"text-3xl px-6 py-2"
}

const defaultStyles="rounded-md px-4 py-1"

export const Button=(props:ButtonProps)=>{
    return(
        <button className={`flex items-center justify-center ${VarientStyles[props.varient]} ${defaultStyles} ${SizeStyles[props.size]} ${props.className} cursor-pointer `}>{props.startIcon}&nbsp;{props.text}</button>
    )
}