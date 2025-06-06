import Link from "next/link";
import Button from "./ui/Button";

// TODO-4: props 타입을 정의하세요. interface 사용하세요.

export default function PostItem({ post }: any) {
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
