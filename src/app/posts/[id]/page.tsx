import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import { fetchPost } from "@/lib/api";

// TODO-1: props 타입을 정의하세요. interface 사용하세요.

export default async function PostPage({ params }: any) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  try {
    const post = await fetchPost(id);

    return (
      <main className="container mx-auto px-4 py-8">
        <PostDetail post={post} />
      </main>
    );
  } catch {
    // 게시글을 찾을 수 없으면 404 페이지로
    notFound();
  }
}
