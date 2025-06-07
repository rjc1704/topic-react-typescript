"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import { fetchPost, updatePost } from "@/lib/api";
import { Post } from "@/types";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) {
          notFound();
        }

        const postData = await fetchPost(id);
        setPost(postData);
      } catch {
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (data: Omit<Post, "id">): Promise<void> => {
    if (!post) return;

    setIsSubmitting(true);
    try {
      await updatePost(post.id, data);
      // 수정된 게시글 상세 페이지로 이동
      router.push(`/posts/${post.id}`);
    } catch (error) {
      setIsSubmitting(false);
      // 에러는 PostForm 컴포넌트에서 처리
      throw error;
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PostForm
        onSubmit={handleSubmit}
        initialData={{
          title: post.title,
          content: post.content,
          authorId: post.authorId,
        }}
        isLoading={isSubmitting}
      />
    </main>
  );
}
