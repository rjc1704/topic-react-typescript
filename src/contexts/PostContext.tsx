"use client";

import { createContext, useContext, useRef, useEffect, useState } from "react";
import { Post } from "@/types";

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  refreshPosts: () => Promise<void>;
}

// Context 생성
const PostContext = createContext<PostContextType>({
  posts: [],
  setPosts: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  refreshPosts: () => Promise.resolve(),
});

interface PostProviderProps {
  children: React.ReactNode;
}

// Context Provider 컴포넌트
export function PostProvider({ children }: PostProviderProps) {
  // useState 타입 정의 예시
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useRef 타입 정의 예시
  const mountedRef = useRef<boolean>(false);

  // useEffect 타입 정의 예시
  useEffect((): (() => void) => {
    mountedRef.current = true;

    return (): void => {
      mountedRef.current = false;
    };
  }, []);

  const refreshPosts = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // 실제 API 호출은 컴포넌트에서 처리
      console.log("Context에서 posts 새로고침 요청");
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const contextValue = {
    posts,
    setPosts,
    loading,
    setLoading,
    error,
    setError,
    refreshPosts,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}

// useContext 훅 타입 정의 예시
export function usePostContext() {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }

  return context;
}
