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
const CanvasArea = ({ zoom, pageNumber, textBoxes, setTextBoxes }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [styles, setStyles] = useState({
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
    fontSize: 14,
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

  const handleDeleteTextBox = () => {
    if (focusedIndex !== null) {
      setTextBoxes((prev) => prev.filter((_, index) => index !== focusedIndex));
      setFocusedIndex(null);
    }
  };

  const toggleStyle = (key, value) => {
    setStyles((prev) => ({ ...prev, [key]: prev[key] === value ? "normal" : value }));
  };

  const changeFontSize = (change) => {
    setStyles((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize + change, 8),
    }));
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex]);

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
      <Box position="absolute" top={10} left={10} fontSize={12} color="grey.500">
        Page {pageNumber}
      </Box>

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
    },
    ...textBox.styles,
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
                onClick={() => setStyles((prev) => ({ ...prev, textAlign: "left" }))}
              >
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Center">
              <IconButton
                onClick={() => setStyles((prev) => ({ ...prev, textAlign: "center" }))}
              >
                <FormatAlignCenterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Right">
              <IconButton
                onClick={() => setStyles((prev) => ({ ...prev, textAlign: "right" }))}
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
          </Box>
        )}
    </Box>
  );
};

export default CanvasArea;
