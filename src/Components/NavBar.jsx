import React from "react";
import styles from "../css/NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/flashcard"
            >
              Flash Card
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/wordlist"
            >
              Word List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
