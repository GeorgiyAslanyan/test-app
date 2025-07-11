import React from 'react';

const CommentSkeleton = () => (
  <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg animate-pulse">
    <div className="h-4 bg-zinc-700 rounded w-1/2 mb-2" />
    <div className="h-3 bg-zinc-700 rounded w-1/3 mb-3" />
    <div className="h-4 bg-zinc-700 rounded w-full mb-1" />
    <div className="h-4 bg-zinc-700 rounded w-5/6" />
  </div>
);

export default CommentSkeleton;