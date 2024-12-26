import { getPosts } from "@/lib/posts";
import PostCard from "@/views/posts-view";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
       <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
