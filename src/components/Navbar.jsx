import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import logo from "../assets/images/origami.png";
import { useSelector } from "react-redux";
import CloudDoneIcon from '@mui/icons-material/CloudDone';
const Navbar = () => {
    const user=useSelector((state)=>state.user);
  return (
    <AppBar
  position="static"
  sx={{
    background: "linear-gradient(to right, #1a1a1d, #33334d, #1a1a1d)", // Dark black-gray gradient
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)", // Deeper shadow for elegance
    padding: "0 16px",
    borderBottom: "2px solid #444", // Subtle detail for sophistication
  }}
>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Company Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: "40px", height: "40px" }}
          />
          
        </Box>
        <Box sx={{alignItems:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Typography sx={{color:'lightgrey', fontWeight:200, letterSpacing:2}}>All changes saved</Typography>
            <CloudDoneIcon size={20} sx={{marginLeft:3}}/>
        </Box>
        {/* Right: Export Button and Username */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
  variant="outlined"
  sx={{
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)", // Gradient for 3D effect
    borderColor: "transparent",
    color: "#6a11cb", // Text color
    fontWeight: "bold",
    borderRadius: "20px",
    padding: "10px 20px",
    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.8)", // 3D shadow effect
    "&:hover": {
      background: "linear-gradient(145deg, #e6e6e6, #ffffff)", // Reverse gradient on hover
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.8)", // Softer shadow
      transform: "translateY(-2px)", // Slight lift on hover
    },
    transition: "all 0.3s ease-in-out", // Smooth animations
    marginRight:5
  }}
>
  Export
</Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {user.name}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
