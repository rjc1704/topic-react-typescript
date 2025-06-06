import Link from "next/link";
import Button from "./ui/Button";
import { Post } from "@/types";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div
      key={post.id}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          작성자 ID: {post.authorId}
        </span>
        <Link href={`/posts/${post.id}`}>
          <Button variant="secondary" className="text-sm px-3 py-1">
            자세히 보기
          </Button>
        </Link>
      </div>
    </div>
  );
}
