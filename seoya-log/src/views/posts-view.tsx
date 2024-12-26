'use client';

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

export default async function PostsPage({ post }: { post: any }) {

  return (
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

  );
}
