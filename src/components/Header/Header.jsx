// import { useState } from "react";
import { useDataContext } from "../../DataContextFolder/DataProvider";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; 
import Button from "../Button";
import CartHover from "../CartHover/CartHover";




export default function Header() {

  const { theme, cart, openCart, handleDispatch } = useDataContext()

  function openCloseCart(){
    handleDispatch({type: "openCart"});
  }


  return (  
    <header className={theme ? "dark w-full h-[7vh] flex justify-between items-center p-[2em] overflow-y-hidden bg-[#252525]" : `w-full h-[7vh] flex justify-between items-center p-[2em] bg-white overflow-y-hidden`} >
        
        <h1>
          <Link to="/" className="text-[2.3em] dark:text-red-500">Bat<span className="text-red-500 dark:text-white" >.com</span></Link>
        </h1>

        <nav className="w-[12%] h-auto flex justify-between items-center max-[700px]:w-[18%] max-[500px]:w-[25%]" >
              <Button className="p-[2px] text-[1em] border-0 outline-none cursor-pointer" handleFunc={handleDispatch} type="changeTheme" backgroundColor={!theme ? "fff" : "252525"} fontSize={20} >
                {!theme ? "🌙" : "🌞"}
              </Button>

              <ul>
                <li className="block h-full cursor-pointer dark:text-white hover:text-red-500" onClick={openCloseCart}>
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
