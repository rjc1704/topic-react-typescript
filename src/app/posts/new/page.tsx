"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { createPost } from "@/lib/api";
import { Post } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewPostPage() {
  const router = useRouter();

  // TODO-2: useMutation 에 제네릭 타입을 적용해 보세요
  const queryClient = useQueryClient();
  const {
    mutate: createPostMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/posts");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = async (data: Omit<Post, "id">): Promise<void> => {
    createPostMutation(data);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {error && <div className="text-red-500">{error.message}</div>}
      <PostForm onSubmit={handleSubmit} isLoading={isPending} />
    </main>
  );
}
