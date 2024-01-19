import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { setColorMode } from "./colorMode";
import FirstPage from "./pages/FirstPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="min-h-[100vh]">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

setColorMode();

export default App;
