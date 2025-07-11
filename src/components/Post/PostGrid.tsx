import { useEffect, useState, useRef } from 'react';
import { getAllPosts } from '../../services/posts';
import PostCard from './PostCard';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import Loader from '../UI/Loader';
import PostSkeleton from './PostSkeleton';

export default function PostGrid({ searchQuery }: { searchQuery: string }) {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const triggerRef = useInfiniteScroll(loadMorePosts);
  const PAGE_SIZE = 12;
  const isFirstLoad = useRef(true);

  console.log(page)
  // Загружаем все посты один раз
  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    getAllPosts().then(data => {
      if (!ignore) {
        setAllPosts(data);
      }
    }).finally(() => {
      if (!ignore) setIsLoading(false);
    });
    return () => { ignore = true; };
  }, []);

  // Фильтруем посты по заголовку при изменении поиска или allPosts
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? allPosts.filter(post => post.title.toLowerCase().includes(q))
      : allPosts;
    setFilteredPosts(filtered);
    setPage(1);
    setHasMore(filtered.length > PAGE_SIZE);
    setVisiblePosts(filtered.slice(0, PAGE_SIZE));
  }, [searchQuery, allPosts]);

  // Ленивая подгрузка
  function loadMorePosts() {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => { // имитация задержки
      setVisiblePosts(prev => {
        const next = filteredPosts.slice(prev.length, prev.length + PAGE_SIZE);
        const updated = [...prev, ...next];
        setHasMore(updated.length < filteredPosts.length);
        return updated;
      });
      setIsLoading(false);
    }, isFirstLoad.current ? 0 : 400);
    isFirstLoad.current = false;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 min-[1440px]:grid-cols-6 gap-4">
      {isLoading && visiblePosts.length === 0 &&
        Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={`skeleton-${i}`} />)
      }
      {visiblePosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={triggerRef} className="col-span-full">
        {isLoading && visiblePosts.length > 0 && <Loader className="mx-auto my-8" />}
        {!hasMore && !isLoading && visiblePosts.length > 0 && (
          <p className="text-center text-zinc-500 py-4">Это все посты</p>
        )}
        {!hasMore && !isLoading && visiblePosts.length === 0 && (
          <p className="text-center text-zinc-500 py-4">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}