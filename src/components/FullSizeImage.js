import styles from "./FullSizeImage.module.scss"

export const FullSizeImage = ({ src, altDescription }) => {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={`full size ${altDescription}`}
        className={styles.fullSizeCarImage}
      />
    </picture>
  )
}
