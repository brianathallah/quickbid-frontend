import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import LandingPage from "./pages/LandingPage";
import MyProductPage from "./pages/MyProductPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/product/detail/" element={<ProductPage />} />
        <Route exact path="/product/add" element={<AddProductPage />} />
        <Route exact path="/product/edit" element={<AddProductPage />} />
        <Route exact path="/product/bids" element={<MyProductPage />} />
        <Route exact path="/product/listing" element={<MyProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
