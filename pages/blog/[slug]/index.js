// @ts-nocheck
import React from 'react';
import Header from '../../../components/common/Header';
import Head from 'next/head';
import Image from 'next/image';
import rehypeSlug from 'rehype-slug';
import { MDXRemote } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import { serialize } from 'next-mdx-remote/serialize';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getSlug, getArticleFromSlug } from '../../../utils/mdx';
import Contact from '../../../components/modals/Contact';
import LoginModal from '../../../components/modals/LoginModal';
import Perfil from '../../../components/modals/PerfilModal';
import { useModalsContext } from '../../../context_providers/modalsState/modalsStateContext';

export default function Blog({ post: { source, frontmatter } }) {
  const {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    toggleLogin,
    toggleContact,
    togglePerfil,
  } = useModalsContext();

  const structuredData = {
    '@context': 'https://streamreaders.com',
    '@type': 'NewsArticle',
    headline: `${frontmatter.title}`,
    image: `${frontmatter.cover_image}`,
    publisher: {
      '@type': 'Organization',
      name: 'Stream Readers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://streamreaders.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_gris.b263f2b7.png&w=1920&q=75',
      },
    },
  };

  return (
    <>
      <Head>
        <title>{frontmatter.title} | Stream Readers</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="description" content={frontmatter.excerpt}></meta>
        {/* Essential Twitter Meta Tags  */}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.excerpt} />
        <meta name="twitter:image" content={frontmatter.cover_image} />

        {/* Essential Facebook Meta Tags */}

        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:image" content={frontmatter.cover_image} />
        {/* <meta
					property="og:url"
					content={`https://streamreaders.com/blog/${slug}`}
				/> */}
        <meta name="keywords" content="audiolibros, audiolibros en español" />
      </Head>
      <div className="book blog-header">
        <Header />
      </div>
      <div className="article-container">
        <h1 className="article-title">{frontmatter.title}</h1>

        <p className="publish-date">
          <small>{frontmatter.readingTime}</small>
        </p>
        <div className="article-image">
          <Image height={300} width={600} src={frontmatter.cover_image} />
        </div>

        <div className="content">
          <MDXRemote {...source} components={{ Image, Text }} />
        </div>
      </div>

      <Contact isOpen={contactIsOpen} toggle={toggleContact} />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
      <Perfil isOpen={perfilIsOpen} toggle={togglePerfil} />
    </>
  );
}

// dynamically generate the slugs for each article(s)
export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
}
