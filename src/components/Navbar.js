import { NavLink } from "react-router-dom"

import styles from "./Navbar.module.scss"

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink className={getNavlinkClassName} to="/">
        Image Gallery
      </NavLink>
      <NavLink className={getNavlinkClassName} to="form">
        User form
      </NavLink>
    </nav>
  )
}

const getNavlinkClassName = ({ isActive }) => (isActive ? styles.active : "")
