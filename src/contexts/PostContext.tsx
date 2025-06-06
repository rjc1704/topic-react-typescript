"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
// import { Post } from "@/types";

// Context 생성
const PostContext = createContext<any>({
  posts: [],
  setPosts: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  refreshPosts: () => Promise.resolve(),
});

// Context Provider 컴포넌트
export function PostProvider({ children }: any) {
  // useState 타입 정의 예시
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // useRef 타입 정의 예시
  const mountedRef = useRef(false);

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
