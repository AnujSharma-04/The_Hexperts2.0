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
import ReportDisaster from "./pages/reportdisaster"; // Import the missing page
import UserActivity from "./pages/useractivity";

function App() {
  return (
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
          <Route path="/authoritydashboard" element={<PrivateRoute element={AuthorityDashboard} />} /> 
          <Route path="/authorityprofile" element={<PrivateRoute element={AuthorityProfile} />} /> 
          <Route path="/userdashboard" element={<PrivateRoute element={UserDashboard} />} /> 
          <Route path="/reportdisaster" element={<PrivateRoute element={ReportDisaster} />} /> {/* Protected route */}
          <Route path="/useractivity" element={<UserActivity />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;