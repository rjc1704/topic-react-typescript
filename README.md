# Next.js 블로그 프로젝트

Next.js App Router와 TypeScript를 활용한 간단한 블로그 학습 프로젝트입니다.

## 🎯 학습 목표

- Next.js App Router 이해
- TypeScript 타입 시스템 활용
- React Hooks 타입 정의
- 에러 처리 및 API 통신
- 컴포넌트 구조화

## 🛠️ 기술 스택

- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mock Server**: json-server
- **State Management**: React Context API

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 홈페이지
│   └── posts/             # 블로그 관련 페이지
│       ├── page.tsx       # 게시글 목록
│       ├── new/page.tsx   # 새 게시글 작성
│       └── [id]/page.tsx  # 게시글 상세
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── PostList.tsx      # 게시글 목록 컴포넌트
│   ├── PostDetail.tsx    # 게시글 상세 컴포넌트
│   └── PostForm.tsx      # 게시글 작성/수정 컴포넌트
├── contexts/             # React Context
│   └── PostContext.tsx
├── lib/                  # 유틸리티 함수
│   └── api.ts           # API 통신 함수
└── types/               # TypeScript 타입 정의
    └── index.ts
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. json-server 설치 (글로벌 또는 로컬)

```bash
# 글로벌 설치
npm install -g json-server

# 또는 로컬 설치
npm install --save-dev json-server
```

### 3. Mock API 서버 실행

```bash
# 글로벌 설치 시
json-server --watch db.json --port 4000

# 로컬 설치 시
npx json-server --watch db.json --port 4000
```

### 4. 개발 서버 실행

```bash
npm run dev
```

이제 브라우저에서 다음 주소들을 확인할 수 있습니다:

- 메인 페이지: http://localhost:3000
- 블로그 목록: http://localhost:3000/posts
- API 서버: http://localhost:4000

## 📚 주요 학습 포인트

### 1. TypeScript 타입 정의

```typescript
// Props는 interface 사용
interface ButtonProps extends BaseProps {
  onClick?: (event: ButtonClickEvent) => void;
  variant?: "primary" | "secondary" | "danger";
}

// 일반 객체 타입은 type alias 사용
type Post = {
  id: string;
  title: string;
  content: string;
  authorId: number;
};
```

### 2. React Hooks 타입 정의

```typescript
// useState
const [posts, setPosts] = useState<Post[]>([]);

// useRef
const inputRef = useRef<HTMLInputElement>(null);

// useContext
const context: PostContextType | undefined = useContext(PostContext);
```

### 3. 이벤트 타입 정의

```typescript
const handleClick = (event: ButtonClickEvent): void => {
  // 클릭 이벤트 처리
};

const handleSubmit = (event: FormSubmitEvent): Promise<void> => {
  // 폼 제출 처리
};
```

### 4. 에러 처리

```typescript
try {
  const posts = await fetchPosts();
  setPosts(posts);
} catch (error) {
  if (error instanceof ApiException) {
    setError(error.error.message);
  }
}
```

## 🎨 컴포넌트 예시

### Button 컴포넌트

```tsx
<Button variant="primary" onClick={handleClick} disabled={loading}>
  저장
</Button>
```

### Input 컴포넌트

```tsx
<Input
  type="text"
  value={title}
  onChange={handleTitleChange}
  placeholder="제목을 입력하세요"
  required
/>
```

## 🚀 다음 단계

이 프로젝트는 기본 버전이며, 추후 다음 기능들을 추가할 예정입니다:

- **react-hook-form**: 폼 관리 라이브러리
- **react-query (TanStack Query)**: 서버 상태 관리
- **zod**: 런타임 타입 검증
- **shadcn/ui**: 고급 UI 컴포넌트

## 📝 API 엔드포인트

Mock API (json-server) 엔드포인트:

- `GET /posts` - 모든 게시글 조회
- `GET /posts/:id` - 특정 게시글 조회
- `POST /posts` - 새 게시글 생성
- `PUT /posts/:id` - 게시글 업데이트
- `DELETE /posts/:id` - 게시글 삭제

## 🤝 기여하기

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선사항이나 버그가 있다면 언제든 이슈를 등록해 주세요.

## �� 라이선스

MIT License
