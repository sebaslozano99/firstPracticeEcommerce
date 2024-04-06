import {useDataContext} from "../../DataContextFolder/DataProvider";
import PropTypes from "prop-types";
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
    <div className={`shadow-[0_0_4px_rgba(0,0,0,.4)] rounded-xl flex flex-col justify-around items-center p-4 hover:shadow-[3px_3px_5px_rgba(33,33,33,.5)] dark:bg-[#333131] ${theme && " dark"}`} >
        <Link to={`${info.title}`} style={{textDecoration: "none"}}>
          <h2 className="text-[1.3em] text-black capitalize dark:text-white font-semibold dark:font-bold" >
              {info.title} 
          </h2>
        </Link>
        <img src={info.images[0]} alt={info.title} className="w-[8em] my-2" />
        <h3 className="dark:text-white">${info.price}</h3>
        <p style={theme ? {color: "#fff"} : {}}>Rate: {info.rating} ⭐</p>
        <Button backgroundColor={!theme ? "30D3F4" : "FF0E0E"} color={theme ? "ffffff" : "000000"} padding={8} fontSize={15} handleFunc={checkItemIsNotInCart} type="addToCart" payload={info} >Add to Cart</Button>
    </div>
  )
}

export default ProductCard


ProductCard.propTypes = {
    info: PropTypes.object,
}