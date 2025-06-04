"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { createPost } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (data: any): Promise<void> => {
    try {
      const newPost = await createPost(data);
      // 생성된 게시글 상세 페이지로 이동
      router.push(`/posts/${newPost.id}`);
    } catch (error) {
      // 에러는 PostForm 컴포넌트에서 처리
      throw error;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <PostForm onSubmit={handleSubmit} />
    </main>
  );
}
