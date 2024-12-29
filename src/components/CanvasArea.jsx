import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Tooltip, IconButton } from '@mui/material';
import Draggable from 'react-draggable';
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as Resizable from 'react-resizable';
import { Rnd } from "react-rnd";
import IconRenderer from './IconRenderer';

const CanvasArea = ({ zoom, pageNumber, textBoxes, setTextBoxes, shapes,setShapes, icons, setIcons }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [focusedShapeIndex, setFocusedShapeIndex] = useState(null);
  const [focusedIconIndex,setFocusedIconIndex]=useState(null);
  const [styles, setStyles] = useState({
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontSize: 14,
    fontFamily:'default'
  });
  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'center',
  };

  const handleTextChange = (index, newText) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].text = newText;
    setTextBoxes(updatedTextBoxes);
  };

  const handleDrag = (index, data) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].x = data.x;
    updatedTextBoxes[index].y = data.y;
    setTextBoxes(updatedTextBoxes);
    
  };

  const handleDragShapes = (index, data) => {
    const updatedShapes = [...shapes];
   // console.log(index);
    updatedShapes[index].x = data.x;
    updatedShapes[index].y = data.y;
    setShapes(updatedShapes);
  };

  const handleDragIcon = (index, data) => {
    const updatedIcons = [...icons];
   // console.log(index);
    updatedIcons[index].x = data.x;
    updatedIcons[index].y = data.y;
    setIcons(updatedIcons);
  };

  const handleResizeShapes = (index, data) => {
    const updatedShapes = [...shapes];
    //console.log(index);
    updatedShapes[index].width = data.width;
    updatedShapes[index].height = data.height;
    setShapes(updatedShapes);
  };

  const handleResizeIcons = (index, data) => {
    const updatedIcons = [...icons];
    //console.log(index);
    updatedIcons[index].width = data.width;
    updatedIcons[index].height = data.height;
    setShapes(updatedIcons);
  };

  const handleDeleteTextBox = () => {
    if (focusedIndex !== null) {
      setTextBoxes((prev) => prev.filter((_, index) => index !== focusedIndex));
      setFocusedIndex(null);
    }
  };

  const handleDeleteShape = () => {
    if (focusedShapeIndex !== null) {
      setShapes((prev) => prev.filter((_, index) => index !== focusedShapeIndex));
      setFocusedShapeIndex(null);
    }
  };

  const handleDeleteIcon = () => {
    if (focusedIconIndex !== null) {
      setIcons((prev) => prev.filter((_, index) => index !== focusedIconIndex));
      setFocusedIconIndex(null);
    }
  };
  const toggleStyle = (key, value) => {
    const updatedTextBoxes = [...textBoxes];
    //console.log(updatedTextBoxes[focusedIndex].key)
    if(updatedTextBoxes[focusedIndex][key]===value)
      updatedTextBoxes[focusedIndex][key]="normal"
    else
    updatedTextBoxes[focusedIndex][key]=value;
    setTextBoxes(updatedTextBoxes);
    console.log(textBoxes)
    //setTextBoxes((prev) => ({ ...prev, [key]: prev[key] === value ? "normal" : value }));
  };

  const changeFontSize = (change) => {
    const updatedTextBoxes=[...textBoxes];
    updatedTextBoxes[focusedIndex].fontSize= Math.max(updatedTextBoxes[focusedIndex].fontSize + change, 8);
    setTextBoxes(updatedTextBoxes);
    //console.log(styles);
  };


  const handleFocus = (event, index) => {
    setFocusedIndex(index);
    const { top, left, height } = event.target.getBoundingClientRect();
    console.log(left);
    setMenuPosition({ top: top - height - 10 });
  };

  const handleBlur = () => {
    setFocusedIndex(null);
    setMenuPosition(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && focusedIndex !== null) {
        handleDeleteTextBox();
      }
      if (event.key === 'Delete' && focusedShapeIndex !== null) {
        handleDeleteShape();
      }
      if (event.key === 'Delete' && focusedIconIndex !== null) {
       // console.log(focusedIconIndex)
        handleDeleteIcon();
      }
    
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, focusedShapeIndex, focusedIconIndex]);

  return (
    <Box
      bgcolor="white"
      width="210mm"
      height="297mm"
      boxShadow={3}
      position="relative"
      mb={2}
      sx={zoomStyle}
    >

{icons?.map((icon, index) => (
          <IconRenderer key={index}
           index={index}
           icon={icon}
           updateIcon={handleDragIcon} 
           updateIconStruct={handleResizeIcons}
           focusedIconIndex={focusedIconIndex}
           setFocusedIconIndex={setFocusedIconIndex} />
        ))}

       {shapes?.map((shape, index) => (
          <ShapeRenderer key={index}
           index={index}
           shape={shape}
           updateShape={handleDragShapes} 
           updateShapeStruct={handleResizeShapes}
           focusedShapeIndex={focusedShapeIndex}
           setFocusedShapeIndex={setFocusedShapeIndex}/>
        ))}
    {/* Render Draggable Text Boxes */}
      {textBoxes?.map((textBox, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: textBox.x, y: textBox.y }}
          onStop={(e, data) => handleDrag(index, data)}
        >
           
          <Box
            sx={{
              position: 'absolute',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //border: '1px dashed grey',
              borderRadius: '4px',
              cursor: 'move',
              
            }}
          >
           <TextField
  variant="outlined"
  onFocus={(e) => handleFocus(e, index)}
  //onBlur={handleBlur}
  value={textBox.text}
  onChange={(e) => handleTextChange(index, e.target.value)}
  multiline
 sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', // No border by default
      },
      '&:hover fieldset': {
        borderColor: '#00B4D8', // Brighter ocean blue on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0077B6', // Deep ocean blue on focus
        borderWidth: '2px',
      },
      "& textarea": {
        fontSize: `${textBox.fontSize}px`, // Apply the fontSize to the textarea
        fontWeight: textBox.fontWeight,
        fontStyle: textBox.fontStyle,
        textDecoration: textBox.textDecoration,
        textAlign: textBox.textAlign,
        fontFamily:textBox.font,
        
      },
    },
    //...styles,
  }}
/>

          </Box>
        </Draggable>
      ))}
      {menuPosition && (
          <Box
            position="absolute"
            top={menuPosition.top}
            left={menuPosition.left}
            bgcolor="white"
            boxShadow={3}
            borderRadius={20}
            p={1}
            display="flex"
            //gap={1}
            zIndex={10}
          >
            <Tooltip title="Bold">
              <IconButton
                onClick={() => toggleStyle("fontWeight", "bold")}
              >
                <FormatBoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Italic">
              <IconButton
                onClick={() => toggleStyle("fontStyle", "italic")}
              >
                <FormatItalicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Underline">
              <IconButton
                onClick={() => toggleStyle("textDecoration", "underline")}
              >
                <FormatUnderlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Left">
              <IconButton
                onClick={() => {
                  const updatedTextBoxes=[...textBoxes];
                  updatedTextBoxes[focusedIndex].textAlign="left";
                  setTextBoxes(updatedTextBoxes);
                }}
              >
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Center">
              <IconButton
                onClick={() => {
                  const updatedTextBoxes=[...textBoxes];
                  updatedTextBoxes[focusedIndex].textAlign="center";
                  setTextBoxes(updatedTextBoxes);
                }}
              >
                <FormatAlignCenterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Right">
              <IconButton
                onClick={() => {
                  const updatedTextBoxes=[...textBoxes];
                  updatedTextBoxes[focusedIndex].textAlign="right";
                  setTextBoxes(updatedTextBoxes);
                }}
              >
                <FormatAlignRightIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Increase Font Size">
              <IconButton onClick={() => changeFontSize(2)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decrease Font Size">
              <IconButton onClick={() => changeFontSize(-2)}>
                <RemoveIcon />
              </IconButton>
            </Tooltip>
            {/* Font Selector */}
  <Tooltip title="Change Font">
    <Box>
      <select
        value={textBoxes[focusedIndex].font || "Default"}
        onChange={(e) =>
         {// setTextBoxes((prev) => ({ ...prev, font: e.target.value }));
         const updatedTextBoxes = [...textBoxes];
         updatedTextBoxes[focusedIndex].font=e.target.value;
         setTextBoxes(updatedTextBoxes);
        //console.log(styles);
         }
        }
        style={{
          padding: "5px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Verdana">Verdana</option>
        <option value="Roboto">Roboto</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
      </select>
    </Box>
  </Tooltip>

  {/* Text Color */}
  <Tooltip title="Text Color">
    <input
      type="color"
      value={styles.color || "#000000"}
      onChange={(e) =>
        setStyles((prev) => ({ ...prev, color: e.target.value }))
      }
      style={{
        height: "32px",
        width: "32px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      }}
    />
  </Tooltip>
          </Box>
        )}
    </Box>
  );
};



const ShapeRenderer = ({ shape, updateShape,updateShapeStruct,index,focusedShapeIndex,setFocusedShapeIndex }) => {
  const isCircle = shape.type === "circle";
  const isLine = shape.type === "line";
  
  const handleFocusShape = () => {
    setFocusedShapeIndex(index);
    //console.log(focusedShapeIndex);
  };

  return (
    <Rnd
  size={{ width: shape.width,  height: shape.height }}
  position={{ x: shape.x, y: shape.y }}
  onDragStart={handleFocusShape}
  onDragStop={(e, data) => { updateShape(index, { x: data.x, y: data.y }); setFocusedShapeIndex(null); }}
  onResizeStart={handleFocusShape}
  onResizeStop={(e, direction, ref, delta, position) => {
    
    updateShapeStruct(index,{width: ref.style.width,
      height: ref.style.height,})
    
  }}
>
      <div
        style={{
          position: "absolute",
          border: isLine ? `1px solid ${shape.color}` : `2px solid ${shape.color}`,
          
          backgroundColor: isCircle ? "transparent" : "transparent",
          borderRadius: isCircle ? "50%" : "0",
          width: isLine ? shape.width : shape.width,
          height: isLine ? "1px" : shape.height,
        }}
        onClick={handleFocusShape}
      >
       
      </div>
    </Rnd>
  );
};

export default CanvasArea;
