import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, getCommentsByPostId } from '../../services/posts';

import Loader from '../../components/UI/Loader';
import {Button} from '../../components/UI/Button';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPostById(Number(id)),
          getCommentsByPostId(Number(id))
        ]);
        setPost(postData);
        setComments(commentsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Loader className="mx-auto my-8" />;
  if (!post) return <div>Пост не найден</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/">
        <Button className="mb-6">Назад к поиску</Button>
      </Link>
      
      <article className="bg-zinc-800  border border-zinc-700 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-white">{post.body}</p>
      </article>

      <section>
        <h2 className="text-xl font-bold mb-4">Комментарии ({comments.length})</h2>
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-zinc-800  border border-zinc-700 p-4 rounded-lg">
              <h3 className="font-bold">{comment.name}</h3>
              <p className="text-emerald-400 text-sm mb-2">{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}