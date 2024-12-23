import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
 
  return (
    <div className="app">
      <BrowserRouter>
     
          <CssBaseline />
          <Routes>
            <Route path="/builder" element={<Builder />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
