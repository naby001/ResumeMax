import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import AuthPage from "./components/login";
import DashboardPage from "./components/dashboard";
import ResumeBuilder from "./components/template";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/builder" element={<Builder />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/temp" element={<ResumeBuilder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;