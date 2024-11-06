import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getAllPostIds } from "@/helper/lib/posts";
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
    <div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
