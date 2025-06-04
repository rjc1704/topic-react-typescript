export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Next.js 블로그 프로젝트
      </h1>
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          TypeScript와 함께하는 블로그 학습 프로젝트입니다.
        </p>
        <a
          href="/posts"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          블로그 글 보기
        </a>
      </div>
    </main>
  );
}
