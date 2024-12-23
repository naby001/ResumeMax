import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import AuthPage from "./components/login";

import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
 
  return (
    <div className="app">
      <BrowserRouter>
     
          <CssBaseline />
          <Routes>
            <Route path="/builder" element={<Builder />} />
            <Route path="/login" element={<AuthPage/>} />
           
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
