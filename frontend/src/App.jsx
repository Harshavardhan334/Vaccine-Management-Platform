import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Account from "./pages/Account";

import SearchPage from "./pages/resident/SearchPage";
import AddVaccineResidentPage from "./pages/resident/AddVaccineResidentPage";
import AddDiseaseResidentPage from "./pages/resident/AddDiseaseResidentPage"
const App = () => {
  return (
    <Router>
        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/resident/search" element={<SearchPage />} />
        <Route path="/resident/add-vaccine" element={<AddVaccineResidentPage />} />
        <Route path="/resident/add-disease" element={<AddDiseaseResidentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
