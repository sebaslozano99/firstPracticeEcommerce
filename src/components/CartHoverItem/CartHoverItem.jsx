import PropTypes from "prop-types";
import styles from "./CartHoverItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; 
import { useDataContext } from "../../DataContextFolder/DataProvider";
import { useState } from "react";





const CartHoverItem = ({info}) => {

  const { handleDispatch, theme } = useDataContext();
  const [quantity, setQuantity] = useState(1);

  function onChangeQuantity(e, id){
    setQuantity(e.target.value);
    handleDispatch({type: "selectQuantityOfItems", payload: {id: id, number: e.target.value } })
  }

  return (
    <div className={styles.cardContainer}>
        <img src={info.images[0]} alt={info.title} className={styles.img} />

        <div className={styles.middleDiv}>
          <h2 className={!theme ?styles.h2 : `${styles.h2} ${styles.textsDark}`} >{info.title}</h2>
          <select value={quantity} onChange={(e) =>  onChangeQuantity(e, info.id)} >
            {
              Array.from({ length: 5 }, (_,i) => i + 1).map(elem => (
                <option value={elem} key={elem}>{elem}</option>
              ))
            }
          </select>
          <p className={theme ? styles.textsDark : undefined}>${info.price}</p>
        </div>
        <FontAwesomeIcon icon={faTrash} className={styles.trash} onClick={() => handleDispatch({type: "deleteItem", payload: info.id}) } style={theme ? {color: "#fff"} : undefined} /> 
         
    </div>
  )
}

export default CartHoverItem



CartHoverItem.propTypes = {
    info: PropTypes.object,
    cart: PropTypes.array
}
