import DeleteIcon from "../icons/DeleteIcon"
import NoteIcon from "../icons/NoteIcon"
import ShareIcon from "../icons/ShareIcon"
interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube"
}
function Card(props: CardProps) {
    return (
        <div >
            <div className="px-2 py-3 max-w-72 min-h-48 min-w-72  bg-white rounded-lg border-gray-100 shadow border ">
                <div className="flex justify-between ">
                    <div className="flex justify-center items-center gap-1">
                        <NoteIcon className="text-gray-600 " />
                        <div className="text-sm font-medium  ">{props.title}</div>
                    </div>
                    <div className="flex justify-center items-center gap-2 ">
                        <a target="_blank" href={props.link}><ShareIcon className="text-gray-600 cursor-pointer " /></a>
                        <DeleteIcon className="text-gray-600 cursor-pointer" />
                    </div>
                </div>
                <div className="mt-4">
                    {props.type === "youtube" && <iframe className="w-full rounded" src={props.link.replace("watch", "embed").replace("?v=","/")} title="Maximum Number of Fish in a Grid | DSU | DFS | BFS | Leetcode 2658 | codestorywithMIK" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {props.type === "twitter" && <blockquote className="twitter-tweet w-full rounded"> <a href={props.link.replace("x.", "twitter.")}></a></blockquote>}



                </div>

            </div>
        </div>
    )
}

export default Card