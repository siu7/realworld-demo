import styles from './Banner.module.css'
export const Banner = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.banner}>{children}</div>
)
