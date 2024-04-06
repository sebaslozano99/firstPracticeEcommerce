import { useParams } from "react-router-dom"
import { useDataContext } from "../DataContextFolder/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShop, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
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
    <div className={!theme ? "min-h-[90vh]" : `dark min-h-[90vh] bg-[#252525]`}  >
    {/* <div className={`${!theme ? "dark " : ""} min-h-[90vh] dark:bg-[#252525]`}  > */}

      <div className="py-2 px-6">
        <h1 className="text-4xl uppercase dark:text-white font-bold">{productClicked.title}</h1>
        <p className="dark:text-white pt-3">Rating: {productClicked.rating} ⭐</p>
      </div>


      <div className="flex p-14 gap-[4em] lg:flex-row max-[900px]:flex-col max-[900px]:p-4">
        <ImageSlider images={productClicked.images} />

        <div className="p-[1em] shadow-[0_0_5px_rgba(0,0,0,.5)] w-[40%] rounded-[15px] flex flex-col justify-around max-[900px]:w-full" >

          <div>
            <p className="line-through text-stone-600 text-[1.3em]" style={theme ? {color: "#fff"} : {}} >${productClicked.price + productClicked.discountPercentage}</p>
            <p className="text-[2.5em] text-orange-500 font-bold" >${productClicked.price} <em className="text-[0.5em]">Today</em> </p>
          </div>

          <div className="grid grid-cols-3 gap-[5px] max-[900px]:flex max-[900px]:flex-col" >

            <div className="border-[1px] border-black/50 p-[10px] flex flex-col justify-center items-center gap-3 rounded-[10px]" >
              <FontAwesomeIcon icon={faTruck} className="text-[2em] text-blue-600 dark:text-red-500" />
              <p className="text-center dark:text-white" >Shipping to your Home</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>

            <div className="border-[1px] border-black/50 p-[10px] flex flex-col justify-center items-center gap-3 rounded-[10px]" >
              <FontAwesomeIcon icon={faShop} className="text-[2em] text-blue-600 dark:text-red-500" />
              <p className="text-center dark:text-white" >Pick up at Store</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>

            <div className="border-[1px] border-black/50 p-[10px] flex flex-col justify-center items-center gap-3 rounded-[10px]" >
              <FontAwesomeIcon icon={faMotorcycle} className="text-[2em] text-blue-600 dark:text-red-500" />
              <p className="text-center dark:text-white" >Delivery Today</p>
              <span style={!theme ? {color: "blue"} : {color: "orange"}}>Free</span>
            </div>

          </div>

          <div className="p-4">
            <p style={theme ? {color: "#fff"} : {}}> You can get your order THE NEXT DAY. Know the exact time once You confirm your shipping address</p>
          </div>

          {/* <button className={!theme ? styles.addToCart : `${styles.addToCart} ${styles.addCartDark}`} onClick={addItemToCart}>Add to Cart</button> */}

          <button className="py-2.5 px-2 bg-[#30D3F4] outline-none border-0 cursor-pointer text-xl rounded-2xl dark:bg-red-500 dark:text-white"  onClick={addItemToCart}>Add to Cart</button>

        </div>
      </div>
    </div>
  )
}

export default ProductPage
