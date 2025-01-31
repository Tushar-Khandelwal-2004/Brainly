import axios from "axios";
import DeleteIcon from "../icons/DeleteIcon";
import NoteIcon from "../icons/NoteIcon";
import ShareIcon from "../icons/ShareIcon";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    contentId?: string;
    onDelete?: (id: string) => void;
    share?: boolean
}

function Card({ title, link, type, contentId, onDelete, share }: CardProps) {
    async function deleteItem() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: { Authorization: token },
                data: { contentId },
            });

            if (response.data.success && contentId) {
                //@ts-ignore
                onDelete(contentId);
                console.log("Deleted successfully:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    }
    function showAlert() {
        toast.error("You can't delete!", {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            //@ts-ignore
            progressStyle: { backgroundColor: '#ef4444' }
        });
    }
    return (
        <div>
            <div className="px-2 py-3 max-w-72 min-h-48 min-w-72 bg-white rounded-lg border-gray-100 shadow border">
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-1">
                        <NoteIcon className="text-gray-600" />
                        <div className="text-sm font-medium">{title}</div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <a target="_blank" href={link}>
                            <ShareIcon className="text-gray-600 cursor-pointer" />
                        </a>
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
                        <div onClick={share === true ? showAlert : deleteItem}>
                            <DeleteIcon className="text-gray-600 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full rounded"
                            src={link.replace("watch", "embed").replace("?v=", "/")}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <TwitterTweetEmbed
                            tweetId={link.split("/").pop()?.split("?")[0] || ""}
                            options={{ conversation: "none" }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
