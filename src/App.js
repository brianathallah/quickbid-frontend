import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/product/detail/" element={<ProductPage />} />
        <Route exact path="/product/add" element={<AddProductPage />} />
        <Route exact path="/product/bids" element={<AddProductPage />} />
        <Route exact path="/product/listing" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
