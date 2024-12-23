import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Modal,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const ToolsPanel = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [imagePreview, setImagePreview] = useState(null);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [generatedTable, setGeneratedTable] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleGenerateTable = () => {
    const numRows = parseInt(rows, 10);
    const numCols = parseInt(columns, 10);

    if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
      alert('Please enter valid numbers for rows and columns.');
      return;
    }

    const tableRows = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 'Cell')
    );

    setGeneratedTable(tableRows);
    setTableModalOpen(false);
  };

  return (
    <Box
      display="flex"
      bgcolor="white"
      width={600}
      height="100vh"
      borderRadius={3}
      boxShadow={6}
    >
      {/* Left Column */}
      <Box
        width={100}
        bgcolor="primary.main"
        paddingTop={2}
        paddingRight={2}
        paddingLeft={2}
        display="flex"
        flexDirection="column"
        gap={3}
        alignItems="center"
        boxShadow={3}
      >
        <List>
          <ListItem
            button
            onClick={() => setActiveTab('text')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'text' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            <ListItemIcon>
              <TextFieldsIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveTab('image')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'image' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            <ListItemIcon>
              <ImageIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveTab('shapes')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'shapes' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': { backgroundColor: 'secondary.main' },
            }}
          >
            <ListItemIcon>
              <CropIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>

      {/* Right Column */}
      <Box flexGrow={1} p={3} bgcolor="white" borderRadius={2} boxShadow={3}>
        {activeTab === 'text' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              Text
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Add Text Box
            </Button>
            
            <Select defaultValue="Arial" fullWidth sx={{ mb: 2 }}>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
            </Select>
            <Select defaultValue={16} fullWidth sx={{ mb: 2 }}>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Select defaultValue="black" fullWidth>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </Box>
        )}

        {activeTab === 'image' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
              Uploads
            </Typography>
            <Button variant="contained" fullWidth component="label" sx={{ mb: 2 }}>
              Choose Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            <Box
              sx={{
                mt: 2,
                width: '100%',
                height: 150,
                borderRadius: 2,
                bgcolor: 'lightgrey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography variant="body2">No image selected</Typography>
              )}
            </Box>
          </Box>
        )}

        {activeTab === 'shapes' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              Shapes & Icons
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <InsertEmoticonIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <GitHubIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <PhoneIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <EmailIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <InstagramIcon/>
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < WhatsAppIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < LinkedInIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < TwitterIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <YouTubeIcon />
              </IconButton>

              {/* Additional icons here */}
            </Box>
            <Box mt={2}>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Add Shape
              </Button>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Add Icon
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setTableModalOpen(true)}>
                Add Table
              </Button>
            </Box>
          </Box>
        )}

        {/* Modal for Adding Table */}
        <Modal open={tableModalOpen} onClose={() => setTableModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: 300,
            }}
          >
            <Typography variant="h6" mb={2}>
              Add Table
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Rows"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Columns"
                  value={columns}
                  onChange={(e) => setColumns(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => setTableModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleGenerateTable}>
                Generate
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Render Generated Table */}
        {generatedTable && (
          <Box mt={4}>
            <Typography variant="h6">Generated Table:</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {generatedTable[0].map((_, colIndex) => (
                    <TableCell key={colIndex}>Column {colIndex + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedTable.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToolsPanel;
