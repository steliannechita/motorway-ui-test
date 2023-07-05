import ProgressiveImage from "react-progressive-graceful-image"
import imagePlaceholder from "../assets/imageLoadingPlaceholder.webp"
import classnames from "classnames"

import styles from "./VehicleImage.module.scss"

export const VehicleImage = ({ image, ...rest }) => {
  return (
    <ProgressiveImage
      src={`${image.url}.jpg`}
      srcSetData={{ srcSet: `${image.url}.webp` }}
      placeholder={imagePlaceholder}
    >
      {(src, loading, srcSetData) => (
        <img
          id={image.id}
          className={classnames(styles.vehicleImage, {
            [styles.loading]: loading,
          })}
          src={src}
          srcSet={srcSetData.srcSet}
          alt={image.altDescription}
          {...rest}
        />
      )}
    </ProgressiveImage>
  )
}
