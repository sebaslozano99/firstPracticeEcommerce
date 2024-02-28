import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./DataContextFolder/DataProvider";
import Header from "./components/Header/Header.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProductPage from "./pages/ProductPage.jsx";

const App = () => {

  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/"  element={ <HomePage  /> } />
            <Route path="/:product" element={ <ProductPage /> } />
          </Routes>
          <Footer />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App