import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import { fetchPost } from "@/lib/api";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
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
