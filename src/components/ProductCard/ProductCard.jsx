import {useDataContext} from "../../DataContextFolder/DataProvider";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";
import Button from "../Button";
import popSound from "../../../public/pop.mp3";
import { Link } from "react-router-dom";



const ProductCard = ({info}) => {

  const { cartIds, theme, handleDispatch } = useDataContext();

  function playSoundAddCart(){
    new Audio(popSound).play();
    handleDispatch({type: "addToCart", payload:{...info, quantity: 1}});
  }
  
  function checkItemIsNotInCart(){
    if(cartIds.includes(info.id)) return;
    // return handleDispatch({type: "addToCart", payload:{...info, quantity: 1}});
    return playSoundAddCart();
  }
  
  return (
    <div className={!theme ? styles.card : `${styles.cardDark}`}>
        <Link to={`${info.title}`} style={{textDecoration: "none"}}>
          <h2 className={!theme ? styles.title :  `${styles.title} ${styles.titleDark}`}>
              {info.title} 
          </h2>
        </Link>
        <img src={info.images[0]} alt={info.title} className={styles.image} />
        <h3 className={theme ? styles.priceDark : ""}>${info.price}</h3>
        <p style={theme ? {color: "#fff"} : {}}>Rate: {info.rating} ⭐</p>
        <Button backgroundColor={!theme ? "30D3F4" : "FF0E0E"} color={theme ? "ffffff" : "000000"} padding={8} fontSize={15} handleFunc={checkItemIsNotInCart} type="addToCart" payload={info} >Add to Cart</Button>
    </div>
  )
}

export default ProductCard


ProductCard.propTypes = {
    info: PropTypes.object,
}