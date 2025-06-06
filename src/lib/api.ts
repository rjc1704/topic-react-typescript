// import { Post, ApiError } from "@/types";

// 커스텀 에러 클래스
class ApiException extends Error {
  constructor(public error: any) {
    super(error.message);
    this.name = "ApiException";
  }
}

// API 응답 처리 헬퍼
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: any = {
      message: `HTTP Error: ${response.status} ${response.statusText}`,
      status: response.status,
    };
    throw new ApiException(errorData);
  }

  try {
    return await response.json();
  } catch {
    const parseError: any = {
      message: "Failed to parse JSON response",
      status: response.status,
    };
    throw new ApiException(parseError);
  }
}

// 모든 포스트 조회
export async function fetchPosts(): Promise<any[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
    );
    return await handleApiResponse<any[]>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    const networkError: any = {
      message: "Network error: Unable to fetch posts",
      status: 0,
    };
    throw new ApiException(networkError);
  }
}

// 특정 포스트 조회
export async function fetchPost(id: any): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
    );
    return await handleApiResponse<any>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    const networkError: any = {
      message: `Network error: Unable to fetch post ${id}`,
      status: 0,
    };
    throw new ApiException(networkError);
  }
}

// 새 포스트 생성
export async function createPost(postData: any): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      },
    );
    return await handleApiResponse<any>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    const networkError: any = {
      message: "Network error: Unable to create post",
      status: 0,
    };
    throw new ApiException(networkError);
  }
}

// 포스트 수정
export async function updatePost(id: any, postData: any): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postData, id }),
      },
    );
    return await handleApiResponse<any>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    const networkError: any = {
      message: `Network error: Unable to update post ${id}`,
      status: 0,
    };
    throw new ApiException(networkError);
  }
}

// 포스트 삭제
export async function deletePost(id: any): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
      {
        method: "DELETE",
      },
    );
    await handleApiResponse<void>(response);
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }

    const networkError: any = {
      message: `Network error: Unable to delete post ${id}`,
      status: 0,
    };
    throw new ApiException(networkError);
  }
}
