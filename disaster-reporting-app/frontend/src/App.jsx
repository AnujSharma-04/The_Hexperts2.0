// src/App.js
import { Routes, Route } from "react-router-dom";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityProfile from "./pages/AuthorityProfile";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute for protected routes
import Register from "./pages/register"; 

function App() {
  return (
    // <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authoritydashboard" element={<PrivateRoute element={AuthorityDashboard} />} /> {/* Protected route */}
            <Route path="/authorityprofile" element={<PrivateRoute element={AuthorityProfile} />} /> {/* Protected route */}
            <Route path="/userdashboard" element={<PrivateRoute element={UserDashboard} />} /> {/* Protected route */}
          </Routes>
        </main>
        <Footer />
      </div>
    // </ErrorBoundary>
  );
}

export default App;
