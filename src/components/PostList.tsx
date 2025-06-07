"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "@/lib/api";
import Button from "@/components/ui/Button";
import PostItem from "@/components/PostItem";
import { Post } from "@/types";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect 타입 정의 예시
  useEffect((): void => {
    if (posts.length === 0) {
      loadPosts();
    }
  }, [posts.length]);

  const loadPosts = async (): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const fetchedPosts: Post[] = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      const errorMessage: string =
        err instanceof Error ? err.message : "Failed to load posts";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          오류: {error || "Unknown error"}
        </div>
        <Button onClick={loadPosts} variant="primary">
          다시 시도
        </Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">게시글이 없습니다.</div>
        <Link href="/posts/new">
          <Button variant="primary">첫 번째 글 작성하기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">블로그 글 목록</h2>
        <Link href="/posts/new">
          <Button variant="primary">새 글 작성</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
