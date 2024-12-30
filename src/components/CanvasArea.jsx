import React, { useEffect, useState } from 'react';
import { Box, TextField, Tooltip, IconButton, MenuItem, Select } from '@mui/material';
import Draggable from 'react-draggable';
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rnd } from "react-rnd";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const iconMap = {
  github: <GitHubIcon />,
  phone: <PhoneIcon />,
  email: <EmailIcon />,
  facebook: <FacebookIcon />,
  yt: <YouTubeIcon />,
  insta: <InstagramIcon />,
  wa: <WhatsAppIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
};

const CanvasArea = ({ zoom, textBoxes, setTextBoxes, shapes, setShapes, icons, setIcons, ref }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [highestZIndex, setHighestZIndex] = useState(1);

  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'center',
  };

  const fonts = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Comic Sans MS',
    'Impact',
    'Trebuchet MS',
  ];

  // Text Box Handlers
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

  const handleFocus = (event, index) => {
    const updatedTextBoxes = [...textBoxes];

    // Bring focused text box to front
    updatedTextBoxes[index].zIndex = highestZIndex + 1;
    setHighestZIndex((prev) => prev + 1);

    setTextBoxes(updatedTextBoxes);

    setFocusedIndex(index);
    const { top, left } = event.target.getBoundingClientRect();
    setMenuPosition({ top: top - 40, left });
  };

  const handleDeleteTextBox = () => {
    if (focusedIndex !== null) {
      setTextBoxes((prev) => prev.filter((_, index) => index !== focusedIndex));
      setFocusedIndex(null);
    }
  };

  const toggleStyle = (key, value) => {
    const updatedTextBoxes = [...textBoxes];
    if (updatedTextBoxes[focusedIndex][key] === value) {
      updatedTextBoxes[focusedIndex][key] = "normal";
    } else {
      updatedTextBoxes[focusedIndex][key] = value;
    }
    setTextBoxes(updatedTextBoxes);
  };

  const changeFontSize = (change) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[focusedIndex].fontSize = Math.max(updatedTextBoxes[focusedIndex].fontSize + change, 8);
    setTextBoxes(updatedTextBoxes);
  };

  const changeFontFamily = (newFont) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[focusedIndex].fontFamily = newFont;
    setTextBoxes(updatedTextBoxes);
  };

  const changeTextAlign = (align) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[focusedIndex].textAlign = align;
    setTextBoxes(updatedTextBoxes);
  };

  // Shape Handlers
  const handleShapeDrag = (index, x, y) => {
    const updatedShapes = [...shapes];
    updatedShapes[index].x = x;
    updatedShapes[index].y = y;
    setShapes(updatedShapes);
  };

  // Icon Handlers
  const handleIconDrag = (index, x, y) => {
    const updatedIcons = [...icons];
    updatedIcons[index].x = x;
    updatedIcons[index].y = y;
    setIcons(updatedIcons);
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
      ref={ref}
    >
      {/* Render Text Boxes */}
      {textBoxes?.map((textBox, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: textBox.x, y: textBox.y }}
          onStop={(e, data) => handleDrag(index, data)}
        >
          <Box
            sx={{
              position: 'absolute',
              padding: '0px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '4px',
              cursor: 'move',
              zIndex: textBox.zIndex || 1, // Ensure zIndex is set
              '&:hover': {
                borderColor: 'blue',
                borderWidth: '2px',
                borderStyle: 'solid',
              },
            }}
          >
            <TextField
              variant="outlined"
              onFocus={(e) => handleFocus(e, index)}
              value={textBox.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              multiline
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '& textarea': {
                    fontSize: `${textBox.fontSize}px`,
                    fontWeight: textBox.fontWeight,
                    fontStyle: textBox.fontStyle,
                    textDecoration: textBox.textDecoration,
                    textAlign: textBox.textAlign,
                    color: textBox.color || '#000000',
                    fontFamily: textBox.fontFamily || 'Arial',
                    backgroundColor: 'transparent',
                  },
                },
              }}
            />
          </Box>
        </Draggable>
      ))}

      {/* Render Shapes */}
      {shapes?.map((shape, index) => (
        <Rnd
          key={index}
          size={{ width: shape.width, height: shape.height }}
          position={{ x: shape.x, y: shape.y }}
          onDragStop={(e, d) => handleShapeDrag(index, d.x, d.y)}
          onResizeStop={(e, direction, ref, delta, position) => {
            const updatedShapes = [...shapes];
            updatedShapes[index] = {
              ...updatedShapes[index],
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              ...position,
            };
            setShapes(updatedShapes);
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              border: '1px solid black',
              borderRadius: shape.type === 'circle' ? '50%' : '0',
            }}
          />
        </Rnd>
      ))}

      {/* Render Icons */}
      {icons?.map((icon, index) => (
        <Rnd
          key={index}
          size={{ width: icon.width, height: icon.height }}
          position={{ x: icon.x, y: icon.y }}
          onDragStop={(e, d) => handleIconDrag(index, d.x, d.y)}
          enableResizing={false}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {iconMap[icon.type] || <div>No Icon</div>}
          </Box>
        </Rnd>
      ))}

      {/* Text Menu */}
      {menuPosition && (
        <Box
          position="absolute"
          top={menuPosition.top}
          left={menuPosition.left}
          bgcolor="white"
          boxShadow={3}
          borderRadius={1}
          p={1}
          display="flex"
          zIndex={10}
        >
          <Tooltip title="Bold">
            <IconButton onClick={() => toggleStyle("fontWeight", "bold")}>
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton onClick={() => toggleStyle("fontStyle", "italic")}>
              <FormatItalicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton onClick={() => toggleStyle("textDecoration", "underline")}>
              <FormatUnderlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Left">
            <IconButton onClick={() => changeTextAlign("left")}>
              <FormatAlignLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <IconButton onClick={() => changeTextAlign("center")}>
              <FormatAlignCenterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <IconButton onClick={() => changeTextAlign("right")}>
              <FormatAlignRightIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Font Size +">
            <IconButton onClick={() => changeFontSize(2)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Font Size -">
            <IconButton onClick={() => changeFontSize(-2)}>
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Text Color">
            <input
              type="color"
              value={textBoxes[focusedIndex]?.color || "#000000"}
              onChange={(e) => {
                const updatedTextBoxes = [...textBoxes];
                updatedTextBoxes[focusedIndex].color = e.target.value;
                setTextBoxes(updatedTextBoxes);
              }}
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            />
          </Tooltip>
          <Tooltip title="Font Family">
            <Select
              value={textBoxes[focusedIndex]?.fontFamily || "Arial"}
              onChange={(e) => changeFontFamily(e.target.value)}
              displayEmpty
              sx={{
                height: "32px",
                marginLeft: "8px",
              }}
            >
              {fonts.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default CanvasArea;