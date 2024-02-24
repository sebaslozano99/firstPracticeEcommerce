import { useState } from "react";
import { useDataContext } from "../../DataContextFolder/DataProvider";
import styles from "./HomePage.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";

//All Products BreakDown
// smartphones, laptops, fragrances, groceries, home-decoration, furniture
//electronics --- smartphones & laptops  --- $1749 max
//fragrances --- fragrances & skincare --- $120 mx
//groceries --- $70
//home-decoration --- home-decoration & furniture --- $700

function filterItems(array, amountRange){
  return array.filter(element => element.price >= amountRange ? element : null);
}


//function to limit priceRange depending category
function priceRangeAdjuster(category){
  switch(category){
    case "electronics":
      return 1700;
    case "fragrances-skincare":
      return 100;
    case "groceries":
      return 60;
    case "home-decoration":
      return 50;
    default:
      return 1700;
  }
}

export default function HomePage() {

  const {fetchedData, error, loading, theme} = useDataContext();
  const [showFilter, setShowFilter ] = useState(false);
  const [filter, setFilter] = useState("all");
  const [price, setPrice] = useState(0);
  // const prevFilter = useRef(filter);
  const filtedDataByPrice = filterItems(fetchedData, price);

  function onFilterChangeAdjustPrice(e){
    setFilter(e.target.value);
    setPrice(0);
  }


  if(loading) return <Loading />
  if(error === "Failed to fetch") return <p>Something went wrong fetching the data</p>

  return (
    <main className={!theme ? styles.main : `${styles.main} ${styles.dark}`}>


    <div className={styles.filter}>
      { showFilter ? 
      
        <>
        
          <button  onClick={() => setShowFilter(!showFilter)} className={styles.showHide} >&lt;</button> 

            <div>
              <label htmlFor="filterType"  style={theme ? {color: "#fff"} : {}} >Filter by:</label>
              <select value={filter} onChange={(e) => onFilterChangeAdjustPrice(e)} >
                <option value="electronics">Electronics</option> 
                <option value="fragrances-skincare">Fragrances & skin care</option> 
                <option value="groceries">Groceries</option> 
                <option value="home-decoration">Home Decoration-Furniture</option> 
                <option value="all">All</option>
              </select>
            </div>


            <div>
              <label htmlFor="filterType"  style={theme ? {color: "#fff"} : {}}>Price</label>
              <input type="range" min={0} max={priceRangeAdjuster(filter)} value={price} onChange={(e) => setPrice(e.target.value)} />
              <span  style={theme ? {color: "#fff"} : {}} >${price}</span>
            </div>
        </>
        :
        <button  onClick={() => setShowFilter(!showFilter)} className={styles.showHide} >&gt;</button> 
      }
    </div>  

      <section className={styles.container}>
        
        {
          filter === "all" &&
          filtedDataByPrice.map(element => element.category === "smartphones" || element.category === "laptops" || element.category === "fragrances" || element.category === "groceries" || element.category === "home-decoration" || element.category === "furniture" ? <ProductCard key={element.id} info={element} /> : null )
        }
       

        {
          filter === "electronics" && 
          filtedDataByPrice.map(element => element.category === "smartphones" ? <ProductCard key={element.id} info={element} /> : element.category === "laptops" ? <ProductCard key={element.id} info={element} /> : null
          )
        }

        {
          filter === "fragrances-skincare" &&
          filtedDataByPrice.map(element => element.category === "fragrances" ? <ProductCard key={element.id} info={element} /> : element.category === "skincare" ? <ProductCard key={element.id} info={element} /> : null )
        }

        {
          filter === "groceries" && 
          filtedDataByPrice.map(element => element.category === "groceries" ? <ProductCard key={element.id} info={element} /> : null )
        }

        {
          filter === "home-decoration" &&
          filtedDataByPrice.map(element => element.category === "home-decoration" ? <ProductCard key={element.id} info={element} /> : element.category === "furniture" ? <ProductCard key={element.id} info={element}/> : null)
        }

      </section>

    </main>
  )
  
}

