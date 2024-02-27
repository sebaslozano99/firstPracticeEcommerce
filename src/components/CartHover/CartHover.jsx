import {useDataContext} from "../../DataContextFolder/DataProvider";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../CartHover/CartHover.module.css";
import CartHoverItem from "../CartHoverItem/CartHoverItem";
import Button from "../Button";


function cartOpenOrClose(openCart, theme){
  if(!openCart && !theme) return `${styles.container}`;
  if(!openCart && theme) return `${styles.container} ${styles.containerDark}`;
  if(openCart && theme) return `${styles.container} ${styles.active} ${styles.containerDark}`;
  if(openCart && !theme) return `${styles.container} ${styles.active}`;
}



const CartHover = ({openCart, openCloseCart}) => {

    const { theme, cart } = useDataContext();
    
    const total = cart.reduce((acc, curr) => { //total amount to pay by user
      return acc + curr.price * curr.quantity;
    }, 0);
  

  return (
    <div className={
      cartOpenOrClose(openCart, theme)
    }>
      <h2 className={!theme ? styles.title : `${styles.title} ${styles.textsDark}`} >Shopping Bag</h2>
      <button onClick={openCloseCart} className={styles.closeButton} >x</button>

      {
        !cart.length ?
        <div className={styles.firstDiv}>
          <div className={styles.secondDiv}>
            <img src={!theme ? "../../undraw_empty_cart_co35.svg" : "../../Empty-bro.svg"} alt="empty_ill" className={styles.img} />
          </div>

          <div className={styles.thirdDiv}>
            <h2 className={!theme ? styles.h2 : `${styles.h2} ${styles.textsDark}`}>Your Cart is empty</h2>
            {/* <p className={!theme ? styles.p : `${styles.p} ${styles.textsDark}`}>Go ahead and explore top categories.</p> */}
            <Link to="/">
              <Button backgroundColor="30D3F4" padding={15} color="ffffff" handleFunc={openCloseCart} >
                Explore
              </Button>
            </Link>
          </div>
        </div>
      :
        <div className={styles.fourDiv}>
          {
            cart.map(element => <CartHoverItem key={element.id} info={element} />)  
          }
        </div>
      }

  {cart.length > 0 &&    <div className={styles.totalDiv}>
        <div className={styles.totalDivTextContainer}>
            <h3 style={theme ? {color: "#fff"} : {}}>Total</h3>
            <p style={theme ? {color: "#fff"} : {}} >${total}</p>
        </div>

        <button className={styles.checkOut}>Go to Check Out</button>
      </div>}

    </div>

  )
}

export default CartHover


CartHover.propTypes = {
  openCart: PropTypes.bool,
  openCloseCart: PropTypes.func,
}