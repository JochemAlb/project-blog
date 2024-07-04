import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';
import RootMotionConfig from '@/components/RootMotionConfig';

async function Home() {
  const posts = await getBlogPostList();

  return (
    <RootMotionConfig>
      <div className={styles.wrapper}>
        <h1 className={styles.mainHeading}>Latest Content:</h1>
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
