interface Props {
  comment: IComment;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg">
      <h3 className="font-bold">{comment.name}</h3>
      <p className="text-emerald-500 text-sm mb-2">{comment.email}</p>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment
