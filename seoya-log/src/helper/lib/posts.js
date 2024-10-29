import { dummyPosts } from "./dummyData";

export function getAllPostIds() {
  return dummyPosts.map((post) => ({
    params: {
      category_name: post.category,
      post_id: post.id,
    },
  }));
}

export async function getPostData(category, id) {
  const post = await dummyPosts.find(
    (post) => post.category === category && post.id === id
  );

  if (!post) {
    console.error(`Post not found for category: ${category}, id: ${id}`);
    return null;
  }

  return {
    ...post,
  };
}
