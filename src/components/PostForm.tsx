"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Post } from "@/types";

interface PostFormProps {
  onSubmit: (formData: Omit<Post, "id">) => Promise<void>;
  initialData?: Partial<Omit<Post, "id">>;
  isLoading?: boolean;
}

export default function PostForm({
  onSubmit,
  initialData = {},
  isLoading = false,
}: PostFormProps) {
  // useState 타입 정의 예시
  const [formData, setFormData] = useState<any>({
    title: initialData.title || "",
    content: initialData.content || "",
    authorId: initialData.authorId || 1,
  });
  const [error, setError] = useState<any>(null);

  // useRef 타입 정의 예시
  const titleInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  // TODO-1 : 아래 4개의 이벤트 핸들러 함수의 이벤트 타입을 각각 정의하세요
  const handleTitleChange = (event: any): void => {
    setFormData((prev: any) => ({
      ...prev,
      title: event.target.value,
    }));
  };

  const handleContentChange = (event: any): void => {
    setFormData((prev: any) => ({
      ...prev,
      content: event.target.value,
    }));
  };

  const handleAuthorChange = (event: any): void => {
    setFormData((prev: any) => ({
      ...prev,
      authorId: Number(event.target.value),
    }));
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    setError(null);

    // 유효성 검사
    if (!formData.title.trim()) {
      setError("제목을 입력해주세요.");
      titleInputRef.current?.focus();
      return;
    }

    if (!formData.content.trim()) {
      setError("내용을 입력해주세요.");
      contentTextareaRef.current?.focus();
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      const errorMessage: string =
        err instanceof Error ? err.message : "Failed to submit form";
      setError(errorMessage);
    }
  };

  const authorOptions = [
    { value: 1, label: "작성자 1" },
    { value: 2, label: "작성자 2" },
    { value: 3, label: "작성자 3" },
  ];

  // 수정 모드인지 확인 (initialData에 title이 있으면 수정 모드)
  const isEditMode = Boolean(initialData.title);

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          {initialData.title ? "게시글 수정" : "새 게시글 작성"}
        </h2>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* 제목 입력 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          제목 *
        </label>
        <Input
          ref={titleInputRef}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="게시글 제목을 입력하세요"
          required
          className="w-full"
        />
      </div>

      {/* 작성자 선택 */}
      <div>
        <label
          htmlFor="authorId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          작성자 *
          {isEditMode && (
            <span className="text-gray-500 text-sm ml-2">(수정 불가)</span>
          )}
        </label>
        <Select
          name="authorId"
          value={formData.authorId}
          onChange={handleAuthorChange}
          options={authorOptions}
          required
          disabled={isEditMode}
          className={`w-full ${
            isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용 *
        </label>
        <textarea
          ref={contentTextareaRef}
          name="content"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="게시글 내용을 입력하세요"
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          취소
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading
            ? "처리 중..."
            : initialData.title
            ? "수정하기"
            : "작성하기"}
        </Button>
      </div>
    </form>
  );
}
