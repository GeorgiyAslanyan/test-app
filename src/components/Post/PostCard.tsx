import { motion } from "framer-motion";
import {  useState } from "react";
import { Button } from "../UI/Button";
import Modal from "../UI/Modal";
import Comment from "../Comment/Comment";
import CommentSkeleton from "../Comment/CommentSkeleton";
import { getCommentsByPostId } from "../../services/posts";
import { Link } from "react-router-dom";

export default function PostCard({ post }: { post: IPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const data = await getCommentsByPostId(post.id);
      setComments(data);
    } finally {
      setLoading(false);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setComments(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden"
    >
      <div className="p-4 justify-between flex flex-col gap-2 h-full">
        <div>
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-gray-200 line-clamp-3 mb-4">{post.body}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />{" "}
            </svg>
          </Button>
          <Link to={`/post/${post.id}`} className="px-4 py-2 border border-emerald-500 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
          Смотреть пост
          </Link>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Комментарии</h2>
        {loading && (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <CommentSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}
        {!loading && comments && comments.length === 0 && (
          <div className="text-gray-500">Нет комментариев</div>
        )}
        {!loading && comments && comments.length > 0 && (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
