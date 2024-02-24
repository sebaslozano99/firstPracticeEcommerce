import { useState } from "react";
import { useDataContext } from "../../DataContextFolder/DataProvider";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; 
import styles from "./Header.module.css";
import Button from "../Button";
import CartHover from "../CartHover/CartHover";

export default function Header() {

  const {theme, handleDispatch ,cart} = useDataContext();
  const [openCart, setOpenCart] = useState(false);

  function openCloseCart(){
    setOpenCart(!openCart);
  }

  return (
    <header className={!theme ? styles.header : `${styles.header} ${styles.headerDark}`}>
        
        <h1>
          <Link to="/" className={!theme ?styles.logo : `${styles.logo} ${styles.logoDark}`}>Bat<span className={!theme ?styles.span : `${styles.spanDark} ${styles.span}`} >.com</span></Link>
        </h1>

        <nav className={styles.navBar} >
              <Button className={styles.theme} handleFunc={handleDispatch} type="changeTheme" backgroundColor={!theme ? "fff" : "252525"} fontSize={20} >
                {!theme ? "🌙" : "🌞"}
              </Button>

              <ul>
                <li className={!theme ? styles.texts : `${styles.texts} ${styles.textsDark}`} onClick={openCloseCart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {
                      cart.length ? ` (${cart.length})` : ""
                    }
                </li>
              </ul>

        </nav>
      <CartHover openCart={openCart} openCloseCart={openCloseCart} />

    </header>
  )
}
