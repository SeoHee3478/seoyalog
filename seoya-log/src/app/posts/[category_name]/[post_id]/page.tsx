import { getAllPostIds, getPostData } from "@/helper/lib/posts";

interface Props {
  params: {
    category_name: string;
    post_id: string;
  };
}

export async function generateStaticParams(): Promise<
  Array<{ params: { category_name: string; post_id: string } }>
> {
  const paths: Props[] = getAllPostIds();

  return paths.map(({ params: { category_name, post_id } }) => ({
    params: { category_name, post_id },
  }));
}

export default async function Post({ params }: Props) {
  const postData = await getPostData(params.category_name, params.post_id);

  if (!postData) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>Category: {postData.category}</h1>
      <h2>Post ID: {postData.id}</h2>
      <p>{postData.content}</p>
    </div>
  );
}
