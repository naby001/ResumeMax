
import Navbar from '../components/Navbar';
import React, { useRef, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/origami.png";
import { useSelector } from 'react-redux';
import {jsPDF} from 'jspdf';
const Builder = () => {
  const [zoom, setZoom] = useState(100);
  const location = useLocation();
  const { draft } = location.state || {};
  const x=draft?._id;
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textBoxes, setTextBoxes] = useState(draft?.textboxes || []); // Manage text boxes
  const [shapes, setShapes] = React.useState(draft?.shapes || []);
  const [icons,setIcons]=React.useState(draft?.icons || []);
  const user=useSelector((state)=>state.user);
  const navigate = useNavigate();
  
  const savedraft=async()=>{
    try {
      let requestData = {
        name: textBoxes[0]?.text || "Untitled", // Safely access the first textbox or default to "Untitled"
        creator_id: user._id,
        textboxes: [...textBoxes], // Copy the array of textboxes
        shapes: [...shapes],       // Copy the array of shapes
        icons: [...icons],         // Copy the array of icons
       
      };
      console.log(x);
      if(x){
        requestData={...requestData,id:x};
      }
      //console.log(formData.entries());
      const response=await fetch("http://localhost:3000/drafts/save",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(requestData)
      });
      const returneddata=await response.json();
      const draft=returneddata.draft;
     // console.log(draft);
    } catch (error) {
      console.log(error);
    }
  }


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

  const addIcons=(type)=>{
    const newIcon={
      id:Date.now(),
      type,
      color:"black",
      x:100,
      y:100,
      width:30,
      height:30
    };
    setIcons((prevIcons)=>[...prevIcons,newIcon]);
  }
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

  const canvasRef = useRef(null);

  const drawContent = () => {
    const canvas = canvasRef.current;
    if(canvas)
   { const context = canvas.getContext('2d');

    // Adjust canvas size based on zoom and page number if necessary
    const scale = zoom || 1;
    const width = canvas.width * scale;
    const height = canvas.height * scale;
    context.clearRect(0, 0, width, height);

    // Render shapes, textBoxes, icons on the canvas
    // Draw shapes
    shapes.forEach((shape) => {
      context.beginPath();
      context.arc(shape.x * scale, shape.y * scale, shape.radius * scale, 0, 2 * Math.PI);
      context.fillStyle = shape.color;
      context.fill();
    });

    // Draw textBoxes
    textBoxes.forEach((box) => {
      if (box.page === pageNumber) {
        context.font = `${box.fontSize * scale}px Arial`;
        context.fillStyle = box.color;
        context.fillText(box.text, box.x * scale, box.y * scale);
      }
    });

    // Draw icons (for example, using image or symbol)
    icons.forEach((icon) => {
      const img = new Image();
      img.src = icon.src;
      img.onload = () => {
        context.drawImage(img, icon.x * scale, icon.y * scale, icon.width * scale, icon.height * scale);
      };
    });}
  };
  const exportToPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define A4 page size (210mm x 297mm)
    const pageWidth = 210;
    const pageHeight = 297;

    // Optional: If you want to scale the content based on the zoom
    const scale = zoom || 1;

    // Loop through the shapes array and draw on PDF
    shapes.forEach((shape) => {
      if (shape.type === 'circle') {
        // Draw circle (x, y, radius)
        pdf.setFillColor(shape.color);
        pdf.circle(shape.x * scale, shape.y * scale, shape.radius * scale, 'F');
      }
      // You can add more shapes here (rectangles, lines, etc.)
    });

    // Loop through the textBoxes array and draw text on PDF
    textBoxes.forEach((box) => {
        console.log(box.x);
        pdf.setFontSize(box.fontSize * scale);
      //  pdf.setTextColor(box.color);
        pdf.text('hdfhdd', 14, 50);
      
    });

    // Loop through the icons array and draw images on the PDF
    icons.forEach((icon) => {
      const img = new Image();
      img.src = icon.src;

      img.onload = () => {
        // Add image to PDF (x, y, width, height)
        pdf.addImage(img, 'PNG', icon.x * scale, icon.y * scale, icon.width * scale, icon.height * scale);
        
        // If you want to save the PDF after the image is loaded, call pdf.save() here
        pdf.save('canvas-content.pdf');
      };
    });

    // Save the PDF after drawing everything
    pdf.save('resume.pdf');
  };

  return (
    <Box>
      <Navbar savedraft={savedraft} exportToPDF={exportToPDF}/>
    <Box display="flex" height="100vh">
      
      {/* Tools Panel */}
      <ToolsPanel addTextBox={addTextBox} addShape={addShape} addIcon={addIcons}/>

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
          <IconButton onClick={() => handleZoom(Math.max(zoom - 10, 50))} disabled={zoom <= 50}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{zoom}%</Typography>
          <IconButton onClick={() => handleZoom(Math.min(zoom + 10, 200))} disabled={zoom >= 200}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Display Current Page */}
        <Box display="flex" mb={2} maxWidth="100%" overflow="auto">
          <CanvasArea 
          key={currentPage} 
          zoom={zoom} 
          pageNumber={currentPage} 
          textBoxes={textBoxes.filter((box) => box.page === currentPage)} // Filter by page
          setTextBoxes={setTextBoxes}
          shapes={shapes}
          setShapes={setShapes}
          icons={icons}
          setIcons={setIcons}
          ref={canvasRef}/>
        </Box>

        {/* Add Page Button */}
        <Button variant="contained" color="primary" onClick={addPage}>
          Add Page
        </Button>
      </Box>

      {/* Carousel of Pages (Right side) */}
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