import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import { CssBaseline, ThemeProvider } from "@mui/material";


function App() {
 
  return (
    <div className="app">
      <BrowserRouter>
     
          <CssBaseline />
          <Routes>
            <Route path="/builder" element={<Builder />} />
          
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
