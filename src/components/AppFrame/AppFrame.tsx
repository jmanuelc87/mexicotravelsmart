import { Header } from '../Header/Header';
import { SiteFooter } from './SiteFooter';
import styles from './AppFrame.module.css';

interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  return (
    <div className={styles['stage']}>
      <div className={styles['frame']}>
        <Header />
        <div className={styles['content']}>
          {children}
          <SiteFooter />
        </div>
        <div className={styles['bottom-bar']} />
      </div>
    </div>
  );
}
