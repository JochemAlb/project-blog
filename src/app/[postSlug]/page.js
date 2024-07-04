import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import dynamic from 'next/dynamic';
// import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';

/*  When lazy loading the component it throws an error when the components uses Framer Motion*/
const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);
const CircularColorsDemo = dynamic(() =>
  import('@/components/CircularColorsDemo')
);

export async function generateMetadata({ params }) {
  const { frontmatter: meta } = await loadBlogPost(params.postSlug);
  return {
    title: `${meta.title} • ${BLOG_TITLE}`,
    description: meta.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter: meta, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={meta.title} publishedOn={meta.publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
