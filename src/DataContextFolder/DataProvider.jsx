import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";


const DataContext = createContext();
const URL = "https://dummyjson.com/products/?limit=100";


const initialValues = {
  theme: false,
  fetchedData: [],
  cart: [],
  error: "",
  loading: false,
}

function reducerFunc(state,action){
  switch(action.type){
    case "initialized":
      return{
        ...state,
        loading: true,
      }
    case "arrived":
      return {
        ...state,
        fetchedData: action.payload,
        loading: false,
      }
    case "didNotArrived":
      return {
        ...state,
        loading: false,
      }
    case "error":
      return {
        ...state,
        error: action.payload,
      }
    case "changeTheme":
      return {
        ...state,
        theme: !state.theme,
      }
    case "addToCart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    case "deleteItem":
      return {
        ...state,
        cart: [...state.cart.filter(element => element.id !== action.payload ? element : null)],
      }
    case "selectQuantityOfItems":
      return {
        ...state,
        cart: [...state.cart.map(element => element.id === action.payload.id ? {...element, quantity: action.payload.number} : element)]
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}


function DataProvider({children}) {
  
    const [{fetchedData, error, loading, theme, cart}, dispatch] = useReducer(reducerFunc, initialValues);
    const cartIds = cart.map(element => element.id); // array of all ids inside cart array

    useEffect(() => {
      async function fetching(){
        try{
          dispatch({type: "initialized"});
          const res = await fetch(URL);
          const data = await res.json();
          dispatch({type: "arrived", payload: data.products});
        }
        catch(error){
          dispatch({type: "error", payload: error.TypeError});
          throw new Error(error);
        }
        finally{
          dispatch({type: "didNotArrived"});
        }
        
      }
    
      fetching();
    }, [])
    

  return (
    <DataContext.Provider value={{
      fetchedData,
      error,
      loading,
      theme,
      cart,
      cartIds,
      handleDispatch: dispatch
    }} >
      {children}
    </DataContext.Provider>
  )
}


DataProvider.propTypes = {
  children: PropTypes.node
}


function useDataContext(){
  const context = useContext(DataContext);
  if(context === undefined) throw new Error("useDataContext was used outside DataContext provider!");  
  return context;
}


export  {DataProvider, useDataContext};