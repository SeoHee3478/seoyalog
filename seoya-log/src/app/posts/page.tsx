import PostCardItem from "@/components/block/PostCardItem";

const PostListPage = () => {
  // 더미 데이터
  const category = "Javascript";
  const title = "브라우저 렌더링 원리";
  const content = "url을 클릭하는 순간부터 페이지 로딩까지";

  return (
    <div className="border border-red-500 px-[16px] lg:px-[20px] flex justify-center items-center">
      <div className="border border-indigo-500 w-[1170px]">
        <PostCardItem category={category} title={title} content={content} />
      </div>
    </div>
  );
};

export default PostListPage;
