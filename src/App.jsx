import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import AuthPage from "./components/login";
import DashboardPage from "./components/dashboard";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";


function App() {
  const user=useSelector((state)=>state.user);
  return (
    <div className="app">
      <BrowserRouter>
          
          <CssBaseline />
          <Routes>
            {user && <Route path="/builder" element={<Builder />} />}
            <Route path="/" element={<AuthPage/>} />
            {user && <Route path="/dash" element={<DashboardPage/>} />}
            
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;