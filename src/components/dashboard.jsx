
import { useState } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Description,
  AccountTree,
  Work,
  LinkedIn,
  PictureAsPdf,
  Add,
  Assessment,
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ResumeIcon from '../assets/images/resume.png';
import PaperIcon from "../assets/images/paper.png";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'light', // Enable dark mode
    primary: {
      main: blue[600],
    },
    background: {
      default: 'white', // Dark background
      paper: 'white', // Dark card background
    },
    text: {
      primary: '#000000', // Light text color
      secondary: '#b0b0b0', // Secondary text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

const drawerWidth = 260

const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))
  const navigate = useNavigate();
  const [drafts,setdrafts]=useState([]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ mt: 2, flex:1 }}>
      <List>
        <ListItem>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src="/placeholder.svg" />
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                My Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Boobindar pusia
              </Typography>
            </Box>
          </Box>
        </ListItem>
        {[ 
          { text: 'Dashboard', icon: <Dashboard /> },
          { text: 'Templates', icon: <Work /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
  variant="outlined"
  fullWidth
  sx={{
    mx: 2,
    width: 'calc(100% - 32px)',
    color: 'rgba(255, 99, 71, 0.8)', // Slightly lighter red for text
    borderColor: 'rgba(255, 99, 71, 0.8)', // Matching border color
    backgroundColor: 'transparent', // Transparent background
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'rgba(255, 99, 71, 0.1)', // Light red tint on hover
      borderColor: 'rgba(255, 99, 71, 1)', // Darker red border on hover
    },
    transition: 'all 0.3s ease', // Smooth transition for hover effects
    borderRadius: '12px', // Rounded corners for a softer look
    fontSize: '1rem',
  }}
>
  Log Out
</Button>
    </Box>
  )

  const content = (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mt: 12,
      }}
    >
   
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[ 
          { title: 'Resume Builder', description: 'Create and edit your resumes.' },
         
        ].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
           <Card
  sx={{
    mx: 'auto',
    maxWidth: 320, // Slightly smaller width
    borderRadius: 3, // Enhanced rounded corners
    height:200,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    transition: 'transform 0.2s, box-shadow 0.2s', // Animation on hover
    '&:hover': {
      transform: 'scale(1.02)', // Slight zoom on hover
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Elevated shadow on hover
    },
    backgroundColor:'#5c96bd',
    cursor:'pointer'
  }}
  onClick={() => navigate('/builder')}
>
  <CardContent>
  <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // To move the image to the right
    gap: 1.5,
    mb: 2,
    padding: 2, // Add some padding for spacing
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    borderRadius: '8px', // Rounded corners for aesthetics
    transition: 'background-color 0.3s ease', // Smooth transition for hover
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change background color on hover
    },
  }}
  
>
  <Typography
    variant="h6"
    color="white"
    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
  >
    {item.title}
  </Typography>
  <img
    src={ResumeIcon}
    alt="Resume"
    style={{
      width: '80px', // Default size
      height: '80px',
      borderRadius: '4px', // Optional styling for rounded corners
      transition: 'transform 0.3s ease', // Smooth hover effect
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.2)'; // Scale up on hover
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)'; // Reset size on hover out
    }}
  />
</Box>
    <Typography
      variant="body2"
      color="whitesmoke"
      sx={{ textAlign: 'justify', lineHeight: 1.5 }}
    >
      {item.description}
    </Typography>
  </CardContent>
</Card>

          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Your Drafts
      </Typography>
      <Grid container spacing={2}>
       {drafts?.map((draft)=><Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Assessment />
                <Typography variant="h6" color="text.primary">Score Analysis</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>) }
      </Grid>
      {drafts.length===0 &&  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 4,
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      marginTop: 4,
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}
  >
    <Typography
      variant="h5"
      sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2, color:'grey' }}
    >
      Nothing Saved Yet! 
    </Typography>
    <img
    src={PaperIcon}
    alt="Empty"
    style={{
      width: '130px', // Default size
      height: '130px',
      borderRadius: '4px', // Optional styling for rounded corners
     // transition: 'transform 0.3s ease', // Smooth hover effect
    }}
   
  />
    
  </Box>}

      {/* Graphics Box */}
      {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Performance Graph
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 500 },
              { name: 'Mar', value: 600 },
              { name: 'Apr', value: 700 },
              { name: 'May', value: 800 },
              { name: 'Jun', value: 900 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            boxShadow: 'none',
           // borderBottom: '1px solid',
           // borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{marginTop:1}}>
            <Typography variant="h6" color="text.primary" >
              Welcome
            </Typography>
            <Typography variant="h6"  sx={{
    fontWeight: 'bold', 
    fontSize: 30, 
    backgroundImage: 'linear-gradient(to right, #635acc, #ff6347)', 
    WebkitBackgroundClip: 'text', 
    color: 'transparent'
  }} >
              Maurya Samanta
            </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                 // boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  //boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        {content}
      </Box>
    </ThemeProvider>
  )
}

export default DashboardPage
