import Link from "next/link";
import { dummyPosts } from "@/helper/lib/dummyData";

export default function PostsPage() {
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
