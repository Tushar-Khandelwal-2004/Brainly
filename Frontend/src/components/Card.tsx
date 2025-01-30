import DeleteIcon from "../icons/DeleteIcon"
import NoteIcon from "../icons/NoteIcon"
import ShareIcon from "../icons/ShareIcon"
import { TwitterTweetEmbed } from 'react-twitter-embed';
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
                    {props.type === "youtube" && <iframe className="w-full rounded" src={props.link.replace("watch", "embed").replace("?v=", "/")}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {props.type === 'twitter' && (
                        <TwitterTweetEmbed
                            tweetId={props.link.split('/').pop()?.split('?')[0] || ''}
                            options={{ conversation: 'none' }}
                        />
                    )}



                </div>

            </div>
        </div>
    )
}

export default Card