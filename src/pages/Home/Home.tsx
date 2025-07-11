import { useState } from 'react';
import PostGrid from '../../components/Post/PostGrid';
import SearchInput from '../../components/UI/SearchInput';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Поиск постов</h1>
      <SearchInput 
        value={searchQuery}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      <PostGrid searchQuery={searchQuery} />
    </div>
  );
}