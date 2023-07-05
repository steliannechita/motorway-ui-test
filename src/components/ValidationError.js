import styles from "./ValidationError.module.scss"

export const ValidationError = ({ children }) => (
  <p role="alert" aria-live="assertive" className={styles.error}>
    {children}
  </p>
)
