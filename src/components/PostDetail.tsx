"use client";

import Link from "next/link";
import { ApiException, deletePost } from "@/lib/api";
import Button from "@/components/ui/Button";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: deletePostMutation,
    isPending: isDeleting,
    error,
  } = useMutation<void, ApiException, Post["id"]>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/posts");
    },
  });

  const handleDelete = async (): Promise<void> => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    deletePostMutation(post.id);
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <Link href="/posts" className="text-blue-500 hover:text-blue-700">
            ← 목록으로 돌아가기
          </Link>
          <div className="flex gap-2">
            <Link href={`/posts/${post.id}/edit`}>
              <Button variant="secondary" className="text-sm">
                수정
              </Button>
            </Link>
            <Button
              variant="danger"
              className="text-sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="text-gray-500 text-sm">
          <span>작성자 ID: {post.authorId}</span>
        </div>
      </header>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          오류: {error.message}
        </div>
      )}

      {/* 본문 */}
      <main className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {post.content}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link href="/posts" className="text-blue-500 hover:text-blue-700">
            ← 목록으로 돌아가기
          </Link>
          <div className="flex gap-2">
            <Link href={`/posts/${post.id}/edit`}>
              <Button variant="secondary">수정하기</Button>
            </Link>
            <Link href="/posts/new">
              <Button variant="primary">새 글 작성</Button>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
