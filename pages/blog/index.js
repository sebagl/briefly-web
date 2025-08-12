// @ts-nocheck
import React from 'react';
import Header from '../../components/common/Header';
import { getAllArticles } from '../../utils/mdx';
import Head from 'next/head';
import Link from 'next/link';
import BlogCard from '../../components/blog/BlogCard';
import { Grid } from '@mui/material';
import Contact from '../../components/modals/Contact';
import LoginModal from '../../components/modals/LoginModal';
import Perfil from '../../components/modals/PerfilModal';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';

export async function getStaticProps() {
  const articles = await getAllArticles();

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1;
      if (a.data.publishedAt < b.data.publishedAt) return -1;

      return 0;
    });

  return {
    props: {
      posts: articles.reverse(),
    },
  };
}

export default function BlogPage({ posts }) {
  const {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    toggleLogin,
    toggleContact,
    togglePerfil,
  } = useModalsContext();
  return (
    <>
      <Head>
        <title>Blog | Stream Readers</title>
      </Head>
      <div className="book blog-header">
        <Header />
      </div>

      <div>
        <h1 className="blog-title">POSTS</h1>

        <Grid container spacing={2}>
          {posts.map((frontMatter) => {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <Link href={`/blog/${frontMatter.slug}`} passHref>
                  <a className="post-container">
                    <BlogCard frontMatter={frontMatter} />
                  </a>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </div>

      <Contact isOpen={contactIsOpen} toggle={toggleContact} />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
      <Perfil isOpen={perfilIsOpen} toggle={togglePerfil} />
    </>
  );
}
