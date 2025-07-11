import { api } from './api';

export const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPosts = async (params: { q?: string; _page?: number; _limit?: number }) => {
  const response = await api.get('/posts', { params });
  return response.data;
};

export const getPostById = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getCommentsByPostId = async (id: number) => {
  const response = await api.get(`/posts/${id}/comments`);
  return response.data;
};