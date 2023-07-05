import ProgressiveImage from "react-progressive-graceful-image"
import imagePlaceholder from "../assets/imageLoadingPlaceholder.webp"
import classnames from "classnames"

import styles from "./ProfileImage.module.scss"

export const ProfileImage = ({ src, userName, ...rest }) => {
  return (
    <ProgressiveImage
      src={`${src}.jpg`}
      srcSetData={{ srcSet: `${src}.webp` }}
      placeholder={imagePlaceholder}
    >
      {(src, loading, srcSetData) => (
        <img
          className={classnames(styles.profileImage, {
            [styles.loading]: loading,
          })}
          src={src}
          srcSet={srcSetData.srcSet}
          alt={`profile for ${userName}`}
          {...rest}
        />
      )}
    </ProgressiveImage>
  )
}
