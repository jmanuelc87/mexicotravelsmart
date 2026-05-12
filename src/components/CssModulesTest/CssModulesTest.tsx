import styles from './CssModulesTest.module.css';

export default function CssModulesTest() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>CSS Modules Test</h2>
      <p className={styles.description}>
        If this component renders with scoped styles, CSS Modules are working correctly.
      </p>
    </div>
  );
}
