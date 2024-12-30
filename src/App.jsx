import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from './screens/Builder';
import AuthPage from "./components/login";
import DashboardPage from "./components/dashboard";
import ResumeBuilder from "./components/template";
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
          <Route path="/" element={<AuthPage />} />
          {user && <Route path="/dash" element={<DashboardPage />} />}
          {user && <Route path="/temp" element={<ResumeBuilder />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;