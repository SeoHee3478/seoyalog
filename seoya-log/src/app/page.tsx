import PostCardItem from "@/components/block/PostCardItem";
export default function Home() {
  // 더미 데이터
  const category = "Tech";
  const title = "Exploring Next.js 13";
  const content =
    "Next.js 13 introduces several new features, including the new App Directory, Turbopack, and more. Let's dive into these new features and see how they can enhance your development workflow.";

  return (
    <div>
      <h1>메인 페이지!</h1>
      <PostCardItem category={category} title={title} content={content} />
    </div>
  );
}
