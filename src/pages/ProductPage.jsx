import { useParams } from "react-router-dom"
import { useDataContext } from "../DataContextFolder/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShop, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductPage.module.css";
import ImageSlider from "../components/imageSlider/ImageSlider";
import popSound from "../../public/pop.mp3";



const ProductPage = () => {

  const {product} = useParams(); //name of product that was clicked
  const { fetchedData, theme,cartIds, handleDispatch } = useDataContext();
  const [productClicked] = fetchedData.filter(element => element.title === product && element); //de-structured array, soo that I have access directly to the object inside

  function playSoundCart(){
    new Audio(popSound).play();
    handleDispatch({type: "addToCart", payload:{...productClicked, quantity: 1}});
  }

  function addItemToCart(){
    if(cartIds.includes(productClicked.id)) return;
    return playSoundCart();
  }


  return (
    <div className={!theme ? styles.container : `${styles.container} ${styles.containerDark}`}>

      <div className={styles.firstDiv}>
        <h1 style={theme ? {color: "#fff"} : {}}>{productClicked.title}</h1>
        <p style={theme ? {color: "#fff"} : {}}>Rating: {productClicked.rating} ⭐</p>
      </div>


      <div className={styles.secondDiv}>
        <ImageSlider images={productClicked.images} />

        <div className={styles.priceContainer}>

          <div className={styles.divHoldsBeforeAndToday}>
            <p className={styles.priceBefore} style={theme ? {color: "#fff"} : {}} >${productClicked.price + productClicked.discountPercentage}</p>
            <p className={styles.todayPrice} >${productClicked.price} <em className={styles.em}>Today</em> </p>
          </div>

          <div className={styles.threeBoxContainer}>
            <div className={styles.box}>
              <FontAwesomeIcon icon={faTruck} className={!theme ? styles.icon : `${styles.icon} ${styles.iconDark}`} />
              <p className={!theme ? styles.text : `${styles.text} ${styles.textDark}`} >Shipping to your Home</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>
            <div className={styles.box}>
              <FontAwesomeIcon icon={faShop} className={!theme ? styles.icon : `${styles.icon} ${styles.iconDark}`} />
              <p className={!theme ? styles.text : `${styles.text} ${styles.textDark}`} >Pick up at Store</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>
            <div className={styles.box}>
              <FontAwesomeIcon icon={faMotorcycle} className={!theme ? styles.icon : `${styles.icon} ${styles.iconDark}`} />
              <p className={!theme ? styles.text : `${styles.text} ${styles.textDark}`} >Delivery Today</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>
          </div>

          <div className={styles.shippingInfo}>
            <p style={theme ? {color: "#fff"} : {}}> You can get your order THE NEXT DAY. Know the exact time once You confirm your shipping address</p>
          </div>

          <button className={!theme ? styles.addToCart : `${styles.addToCart} ${styles.addCartDark}`} onClick={addItemToCart}>Add to Cart</button>

        </div>
      </div>
    </div>
  )
}

export default ProductPage