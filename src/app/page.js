import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import RootMotionConfig from '@/components/RootMotionConfig';

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about JavaScript',
};

async function Home() {
  const posts = await getBlogPostList();

  return (
    <RootMotionConfig>
      <div className={styles.wrapper}>
        <h1 className={styles.mainHeading}>Latest Content:</h1>
        {/* TODO: Iterate over the data read from the file system! */}
        {posts?.map(({ slug, title, abstract, publishedOn }) => {
          const key = crypto.randomUUID();

          return (
            <BlogSummaryCard
              key={key}
              slug={slug}
              title={title}
              abstract={abstract}
              publishedOn={publishedOn}
            />
          );
        })}
      </div>
    </RootMotionConfig>
  );
}

export default Home;
