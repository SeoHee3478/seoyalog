import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";

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
      excerpt: data.excerpt || "",
      readTime: data.readTime || "",
      tags: data.tags || [],
      ...data,
    };
  });

  return posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-col">
            <Badge className="mb-2 text-sm px-2 py-1 w-fit">
              {post.category}
            </Badge>
            <CardTitle>
              <Link
                href={`/posts/${post.category}/${post.id}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {post.excerpt && (
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
              </time>
              <ClockIcon className="w-4 h-4 ml-4" />
              <span className="ml-1">{post.readTime}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
