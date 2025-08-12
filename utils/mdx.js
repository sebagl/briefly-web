import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

const articlesPath = path.join(process.cwd(), "blog_data/articles");

export async function getSlug() {
	const paths = sync(`${articlesPath}/*.mdx`);

	return paths.map((path) => {
		// holds the paths to the directory of the article
		const pathContent = path.split("/");
		const fileName = pathContent[pathContent.length - 1];
		const [slug, _extension] = fileName.split(".");

		return slug;
	});
}

export async function getArticleFromSlug(slug) {
	const articleDir = path.join(articlesPath, `${slug}.mdx`);
	const source = String(fs.readFileSync(articleDir));
	const { content, data } = matter(source);

	return {
		content,
		frontmatter: {
			slug,
			excerpt: data.excerpt,
			title: data.title,
			publishedAt: data.publishedAt,
			readingTime: `Tiempo de lectura: ${Math.ceil(
				readingTime(source).minutes
			)} min`,
			...data,
		},
	};
}

export async function getAllArticles() {
	const articles = fs.readdirSync(
		path.join(process.cwd(), "blog_data/articles")
	);

	return articles.reduce((allArticles, articleSlug) => {
		// get parsed data from mdx files in the "articles" dir
		const source = fs.readFileSync(
			path.join(process.cwd(), "blog_data/articles", articleSlug),
			"utf-8"
		);
		const { data } = matter(source);

		return [
			{
				...data,
				slug: articleSlug.replace(".mdx", ""),
				readingTime: `Tiempo de lectura: ${Math.ceil(
					readingTime(source).minutes
				)} min`,
			},
			...allArticles,
		];
	}, []);
}
