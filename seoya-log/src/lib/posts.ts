import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getPosts(){
    const postsDirectory = path.join(process.cwd(), "content");
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map((filename)=>{
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
            id: filename.replace(/\.md$/, ""),
            title: data.title,
            category: data.category,
            date: data.date,
            author: data.author,
            excerpt: data.excerpt || "",
            readTime: data.readTime || "",
            tags: data.tags || [],
            ...data,
          };
    });
}