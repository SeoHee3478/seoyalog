import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getAllPostIds } from "@/helper/lib/posts";
import Comments from "@/components/block/Comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MessageSquare, ThumbsUp } from "lucide-react";
import styles from "@/styles/postDetailPage.css";
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
  const filePath = path.join(process.cwd(), "content", `${params.post_id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardHeader>
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={data.author_image || "/placeholder-avatar.jpg"}
              alt={data.author || "작성자"}
            />
            <AvatarFallback>{data.author?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{data.author || "작성자 이름"}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`prose max-w-none ${styles.prose}`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {data.tags &&
            data.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            좋아요
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            댓글
          </Button>
        </div>
      </CardFooter>
      <CardContent>
        <Comments postId={params.post_id} />
      </CardContent>
    </Card>
  );
}
