"use client";

import { useState } from "react";
import Link from "next/link";
import { deletePost } from "@/lib/api";
import Button from "@/components/ui/Button";

// TODO-2: props 타입을 정의하세요. interface 사용하세요.

export default function PostDetail({ post }: any) {
  // useState 타입 정의 예시
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 이벤트 타입 정의 예시
  const handleDelete = async (event: any): Promise<void> => {
    event.preventDefault();

    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deletePost(post.id);
      // 삭제 성공 시 리디렉션 (실제로는 router.push 사용)
      window.location.href = "/posts";
    } catch (err) {
      const errorMessage: string =
        err instanceof Error ? err.message : "Failed to delete post";
      setError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
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
          오류: {error}
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
