import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CanvasArea from "../components/CanvasArea";
import ToolsPanel from "../components/ToolsPanel";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/origami.png";
import { LogoDev } from "@mui/icons-material";

const Builder = () => {
  const [zoom, setZoom] = useState(100);
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textBoxes, setTextBoxes] = useState([]);
  const [shapes, setShapes] = useState([]);
  const navigate = useNavigate();

  const addShape = (type) => {
    const newShape = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color: "black",
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  const handleZoom = (value) => {
    setZoom(value);
  };

  const addPage = () => {
    setPages((prev) => [...prev, prev.length + 1]);
  };

  const addTextBox = () => {
    setTextBoxes((prev) => [
      ...prev,
      {
        x: 50,
        y: 50,
        text: "New Text",
        page: currentPage,
        font: "Times New Roman",
        color: "black",
        style: "bold",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        textAlign: "left",
      },
    ]);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="static" sx={{ bgcolor: "#121212" }}>
        {" "}
        {/* Dark Mode */}
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              color: "#ffffff",
            }}
          >
            Resume&nbsp;
            <img
              src={logo} // Replace with your image path
              alt="K"
              style={{
                height: "24px", // Adjust height as needed
                width: "24px", // Adjust width as needed
                margin: "0 4px",
              }}
            />
            Kraft
          </Typography>
          <Button
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#90caf9",
              },
            }}
            onClick={() => navigate("/dash")}
          >
            Dashboard
          </Button>
          <Button
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#90caf9",
              },
            }}
            onClick={() => alert("Help Clicked")}
          >
            Help
          </Button>
          <Button
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#90caf9",
              },
            }}
            onClick={() => alert("About Clicked")}
          >
            About
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box display="flex" flex={1} overflow="hidden">
        {/* Tools Panel */}
        <ToolsPanel addTextBox={addTextBox} addShape={addShape} />

        {/* Main Canvas Area */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          justifyContent="center"
          bgcolor="grey.100"
        >
          {/* Zoom Controls */}
          <Box display="flex" alignItems="center" mb={2} gap={1}>
            <IconButton
              onClick={() => handleZoom(Math.max(zoom - 10, 50))}
              disabled={zoom <= 50}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{zoom}%</Typography>
            <IconButton
              onClick={() => handleZoom(Math.min(zoom + 10, 200))}
              disabled={zoom >= 200}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Display Current Page */}
          <Box display="flex" mb={2} maxWidth="100%" overflow="auto">
            <CanvasArea
              key={currentPage}
              zoom={zoom}
              pageNumber={currentPage}
              textBoxes={textBoxes.filter((box) => box.page === currentPage)}
              setTextBoxes={setTextBoxes}
              shapes={shapes}
              setShapes={setShapes}
            />
          </Box>

          {/* Add Page Button */}
          <Button variant="contained" color="primary" onClick={addPage}>
            Add Page
          </Button>
        </Box>

        {/* Pages Sidebar */}
        <Box
          width="300px"
          p={2}
          display="flex"
          flexDirection="column"
          bgcolor="white"
          boxShadow={3}
          borderRadius={2}
          gap={2}
        >
          <Typography variant="h6" align="center">
            Pages
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {pages.map((page) => (
              <Button
                key={page}
                variant="outlined"
                onClick={() => setCurrentPage(page)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  border:
                    page === currentPage ? "2px solid blue" : "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor:
                    page === currentPage ? "#e3f2fd" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      page === currentPage ? "#c8e6c9" : "#f1f1f1",
                  },
                }}
              >
                Page {page}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Builder;
