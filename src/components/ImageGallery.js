import { useEffect, useState } from "react"
import { Modal } from "./Modal"
import { VehicleImage } from "./VehicleImage"
import { ProfileImage } from "./ProfileImage"
import { FullSizeImage } from "./FullSizeImage"

import styles from "./ImageGallery.module.scss"

export const ImageGallery = () => {
  const [images, setImages] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isModalOpen) {
      document.getElementById(currentImage?.id)?.focus() //restore focus after closing the modal
    }
  }, [isModalOpen, currentImage?.id])

  useEffect(() => {
    setIsLoading(true)
    fetch("images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setImages(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleVehicleCardClick = (currentImage) => {
    setIsModalOpen(true)
    setCurrentImage(currentImage)
  }

  if (error) {
    console.error(error)

    return (
      <div className={styles.error}>
        <p>There has been an error in getting the gallery's images!</p>
      </div>
    )
  }

  if (isLoading || !images) {
    return <div className={styles.loading}>Loading image gallery...</div>
  }

  return (
    <section className={styles.imageGalleryWrapper}>
      <h2>Car collection</h2>
      {isModalOpen ? (
        <Modal handleClose={() => setIsModalOpen(false)}>
          <FullSizeImage
            src={currentImage.url}
            altDescription={currentImage.altDescription}
          />
        </Modal>
      ) : null}
      <ul className={styles.gallery}>
        {images.map((img) => (
          <li key={img.id} className={styles.vehicleCard}>
            <VehicleImage
              image={img}
              tabIndex={0}
              onClick={() => handleVehicleCardClick(img)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleVehicleCardClick(img)
              }
            />
            <div className={styles.profileImageContainer}>
              <ProfileImage
                src={`${img.user.profileImage}`}
                userName={img.user.name}
              />
              <p className={styles.userName}>{img.user.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
