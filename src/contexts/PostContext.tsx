"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Post } from "@/types";

// Context 타입 정의 (type alias)
type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  refreshPosts: () => Promise<void>;
};

// Context Provider Props 인터페이스
interface PostProviderProps {
  children: ReactNode;
}

// Context 생성
const PostContext = createContext<PostContextType | undefined>(undefined);

// Context Provider 컴포넌트
export function PostProvider({ children }: PostProviderProps) {
  // useState 타입 정의 예시
  const [posts, setPosts] = useState<Post[]>([]);
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

  const contextValue: PostContextType = {
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
export function usePostContext(): PostContextType {
  const context: PostContextType | undefined = useContext(PostContext);

  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }

  return context;
}
