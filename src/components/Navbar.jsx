import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import logo from "../assets/images/origami.png";
import { useSelector } from "react-redux";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { keyframes } from "@mui/material";
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Navbar = ({ savedraft }) => {
  const user = useSelector((state) => state.user);
  const [showsaved, setshowsaved] = useState(false);
  const slideInLeftToRight = keyframes`
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;

  const exportToPDF = () => {
    const input = document.getElementById('canvas-area'); // Ensure the CanvasArea component has this ID
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      })
      .catch((err) => {
        console.error('Error exporting to PDF', err);
      });
  };

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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "lightgrey",
              fontWeight: 200,
              letterSpacing: 2,
              animation: `${slideInLeftToRight} 1s ease-out`, // Apply the animation here
              display: "inline-block",
            }}
          >
            {!showsaved ? "Click here to Save" : "All Changes Saved"}
          </Typography>
          <CloudDoneIcon
            size={20}
            sx={{ marginLeft: 3 }}
            onClick={() => {
              savedraft();
              setshowsaved(true);
              setTimeout(() => {
                setshowsaved(false); // After 3 seconds, set showsaved back to false
              }, 3000);
            }}
          />
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
              boxShadow:
                "4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.8)", // 3D shadow effect
              "&:hover": {
                background: "linear-gradient(145deg, #e6e6e6, #ffffff)", // Reverse gradient on hover
                boxShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.8)", // Softer shadow
                transform: "translateY(-2px)", // Slight lift on hover
              },
              transition: "all 0.3s ease-in-out", // Smooth animations
              marginRight: 5,
            }}
            onClick={exportToPDF}
          >
            Export
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", cursor: "pointer", textDecoration: "none" }}
              component={Link}
              to="/dash"
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