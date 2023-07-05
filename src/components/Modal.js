import { useEffect, useRef } from "react"

import styles from "./Modal.module.scss"

export const Modal = ({ handleClose, children }) => {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current.focus()
    const handleEscapeKey = (e) => e.key === "Escape" && handleClose()

    document.body.style.overflow = "hidden" // Prevent page scrolling when  Modal is open
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [handleClose])

  return (
    <div className={styles.modal}>
      {children}
      <button
        aria-label="close button"
        ref={closeButtonRef}
        type="button"
        className={styles.closeButton}
        onMouseUp={() => handleClose()}
        onKeyDown={(e) => {
          e.key === "Enter" && handleClose()
        }}
      >
        X
      </button>
    </div>
  )
}
