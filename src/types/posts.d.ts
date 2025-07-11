interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}