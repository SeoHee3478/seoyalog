// pages/posts/page.tsx
import Link from "next/link";
import { dummyPosts } from "@/helper/lib/dummyData"; // 더미 데이터 사용

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
