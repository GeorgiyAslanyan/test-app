import React from 'react';

const PostSkeleton = () => (
  <div className="bg-black rounded-lg shadow-md p-4 animate-pulse">
    <div className="h-6 bg-zinc-800 rounded w-3/4 mb-3" />
    <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
    <div className="h-4 bg-zinc-800 rounded w-5/6 mb-4" />
    <div className="flex justify-between mt-4">
      <div className="h-8 w-24 bg-zinc-800 rounded" />
      <div className="h-8 w-10 bg-zinc-800 rounded" />
    </div>
  </div>
);

export default PostSkeleton;
