import styles from './ExampleCard.module.css';

interface ExampleCardProps {
  title: string;
  description: string;
  tag?: string;
}

export function ExampleCard({ title, description, tag }: ExampleCardProps) {
  return (
    <article className={styles['card-root']}>
      {tag && (
        <span className={`${styles['card-tag']} sr-only-visible`}>{tag}</span>
      )}
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-description']}>{description}</p>
      <footer className={styles['card-footer']}>
        <a href="#" className={styles['card-link']}>
          Learn more
        </a>
      </footer>
    </article>
  );
}
