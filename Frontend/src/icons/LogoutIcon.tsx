import { IconProps, IconSizeVarients } from "."


function LogoutIcon(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${IconSizeVarients[props.size || "sm"]} ${props.className} size-5 pt-0.5`}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>

    )
}

export default LogoutIcon