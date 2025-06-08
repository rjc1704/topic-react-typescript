"use client";

import Link from "next/link";
import { fetchPosts } from "@/lib/api";
import Button from "@/components/ui/Button";
import PostItem from "@/components/PostItem";
import { useInfiniteQuery } from "@tanstack/react-query";

const POSTS_PER_PAGE = 5; // 페이지당 포스트 수

export default function PostList() {
  // TODO-1: useInfiniteQuery 에 제네릭 타입을 적용해 보세요
  // 하나씩 vs code의 힌트 문구를 참고해서 제네릭 타입을 적용해 보세요
  const {
    data: posts,
    isPending,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 아이템 수가 POSTS_PER_PAGE보다 적으면 더 이상 페이지가 없음
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined;
      }
      return allPages.length + 1; // 다음 페이지 번호 (1-based)
    },
    initialPageParam: 1, // 첫 번째 페이지는 1
    select: (data) => data.pages.flat(),
  });

  if (isPending) {
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
          오류: {error.message || "Unknown error"}
        </div>
        <Button onClick={() => refetch()} variant="primary">
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

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => fetchNextPage()}
            variant="secondary"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "로딩 중..." : "더보기"}
          </Button>
        </div>
      )}
    </div>
  );
}
