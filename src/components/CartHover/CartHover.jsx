import {useDataContext} from "../../DataContextFolder/DataProvider";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartHoverItem from "../CartHoverItem/CartHoverItem";
import Button from "../Button";


function cartOpenOrClose(openCart, theme){
  const baseStyle = "bg-white w-[30%] h-[100vh] flex flex-col justify-end fixed z-[1] top-[0] right-[-100%] shadow-[0_0_2px_#000] transition-all ease-in-out duration-500 py-[15px] px-[7px] max-[1000px]:w-3/6 max-[700px]:w-full";
  if(!openCart && !theme) return `${baseStyle}`;
  if(!openCart && theme) return `${baseStyle} dark dark:bg-[#252525]`;
  if(openCart && theme) return `${baseStyle} dark dark:bg-[#252525] right-[0]`;
  if(openCart && !theme) return `${baseStyle} right-[0]`;
}



const CartHover = ({openCart, openCloseCart}) => {

    const { theme, cart } = useDataContext();
    
    const total = cart.reduce((acc, curr) => { //total amount to pay by user
      return acc + curr.price * curr.quantity;
    }, 0);
  

  return (
    <>

      {openCart && <div className="absolute inset-0 w-full h-screen bg-black/50 backdrop-blur-sm"></div>}

      <div className={
            cartOpenOrClose(openCart, theme)
      }>
        <h2 className="text-[1.8em] text-center font-bold tracking-[2px] overflow-y-hidden dark:text-white" >Shopping Bag</h2>
        <button onClick={openCloseCart} className="w-[30px] h-[30px] rounded-[50%] outline-none border-0 cursor-pointer bg-stone-400 absolute top-0 m-1" >x</button>

        {
          !cart.length ?
          <div className="w-full h-[80%] flex flex-col justify-center items-center gap-[15px]" >

            <div className="w-[70%] grid place-items-center" >
              <img src="../../undraw_empty_cart_co35.svg" alt="empty_ill" className="w-[80%]" />
            </div>

            <div className="flex flex-col items-center justify-around h-[33%]" >
              <h2 className="font-bold text-center text-[1.5em] mb-[0.2em] dark:text-white" >Your Cart is empty</h2>
              <Link to="/">
                <Button backgroundColor="30D3F4" padding={15} color="ffffff" handleFunc={openCloseCart} >
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        :
          <div className="w-full h-[85%] flex flex-col gap-[15px] overflow-y-auto py-[10px] px-[5px]" >
            {
              cart.map(element => <CartHoverItem key={element.id} info={element} />)  
            }
          </div>
        }

        {cart.length > 0 &&    
        <div className="h-[20%] flex flex-col justify-center gap-[15px] border-t-[1px] border-black/50 dark:border-white/50" >
          <div className="flex justify-between items-center py-[2px] px-[5px]">
              <h3 style={theme ? {color: "#fff"} : {}}>Total</h3>
              <p style={theme ? {color: "#fff"} : {}} >${total}</p>
          </div>

          <button className="block rounded-[5px] my-0 mx-auto w-[80%] py-[10px] px-[20px] text-[1.2em] cursor-pointer bg-black text-white outline-none border-0" >Go to Check Out</button>
        </div>}
      </div>
    </>

  )
}

export default CartHover


CartHover.propTypes = {
  openCart: PropTypes.bool,
  openCloseCart: PropTypes.func,
}