import React from 'react';
import Image from 'next/image';
import styles from './blog.module.css';

function BlogCard({ frontMatter }) {
  const { cover_image, excerpt, readingTime, title } = frontMatter;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.img}>
          <Image src={cover_image} alt="card__image" layout="fill" />
        </div>
      </div>
      <div className={styles.card__body}>
        <span className={`${styles.tag} ${styles['tag-blue']}`}>
					Audiolibros
        </span>
        <h4 className={styles.card__title}>{title}</h4>
        <p className={styles.card__text}>{excerpt}</p>
      </div>
      <div className={styles.card__footer}>
        <div>
          <div className={styles.card__image}>
            <div className={styles.user__info}>
              <h5 className={styles.user}>Stream Readers</h5>
              <small>{readingTime}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
