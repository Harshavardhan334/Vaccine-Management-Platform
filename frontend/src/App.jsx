import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Account from "./pages/Account";
import AuthProvider, { useAuth } from "./components/Auth.jsx";

import SearchPage from "./pages/resident/SearchPage";
import AddVaccineResidentPage from "./pages/resident/AddVaccineResidentPage";
import AddDiseaseResidentPage from "./pages/resident/AddDiseaseResidentPage"
import PendingVaccinesPage from "./pages/admin/PendingVaccinesPage.jsx";
import PendingDiseasesPage from "./pages/admin/PendingDiseasesPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/account" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/requests" element={
            <ProtectedRoute roles={["admin"]}>
              <PendingVaccinesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/requests/diseases" element={
            <ProtectedRoute roles={["admin"]}>
              <PendingDiseasesPage />
            </ProtectedRoute>
          } />
          <Route
            path="/resident/search"
            element={
              <ProtectedRoute roles={["resident"]}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/add-vaccine"
            element={
              <ProtectedRoute roles={["resident"]}>
                <AddVaccineResidentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/add-disease"
            element={
              <ProtectedRoute roles={["resident"]}>
                <AddDiseaseResidentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
