import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      id: filename.replace(/\.md$/, ""),
      title: data.title,
      category: data.category,
      date: data.date,
      ...data,
    };
  });

  return posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.category}/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>Category: {post.category}</p>
            <p>Date: {post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
