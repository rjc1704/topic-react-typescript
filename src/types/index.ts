import { ReactNode } from "react";

// 블로그 포스트 타입 (type alias)
export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: number;
};

// API 에러 타입 (type alias)
export type ApiError = {
  message: string;
  status: number;
};

// 폼 데이터 타입 (type alias)
export type PostFormData = {
  title: string;
  content: string;
  authorId: number;
};

// React Event 타입들 (type alias)
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

// 컴포넌트 Props 인터페이스들
export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface ButtonProps extends BaseProps {
  onClick?: (event: ButtonClickEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export interface InputProps extends Omit<BaseProps, "children"> {
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (event: InputChangeEvent) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
}

export interface SelectProps extends Omit<BaseProps, "children"> {
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
}

export interface PostListProps extends BaseProps {
  posts?: Post[];
}

export interface PostDetailProps extends BaseProps {
  post: Post;
}

export interface PostFormProps extends BaseProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  initialData?: Partial<PostFormData>;
  isLoading?: boolean;
}
