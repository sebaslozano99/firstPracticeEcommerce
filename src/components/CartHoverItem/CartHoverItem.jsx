import PropTypes from "prop-types";
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
    <div className="w-full min-h-40 p-[0.5em] flex items-center justify-around gap-5 rounded-2xl" >
        <img src={info.images[0]} alt={info.title} className="w-28 rounded-xl" />

        <div className="w-[60%] h-[80%] flex flex-col items-center justify-evenly" >
          <h2 className="text-base font-bold text-center dark:text-white" >{info.title}</h2>
          <select value={quantity} onChange={(e) =>  onChangeQuantity(e, info.id)} >
            {
              Array.from({ length: 5 }, (_,i) => i + 1).map(elem => (
                <option value={elem} key={elem}>{elem}</option>
              ))
            }
          </select>
          <p className="dark: text-white">{info.price}</p>
        </div>
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer transition-all ease-in duration-200 hover:translate-y-[-4px]" onClick={() => handleDispatch({type: "deleteItem", payload: info.id}) } style={theme ? {color: "#fff"} : undefined} /> 
         
    </div>
  )
}

export default CartHoverItem



CartHoverItem.propTypes = {
    info: PropTypes.object,
    cart: PropTypes.array
}
