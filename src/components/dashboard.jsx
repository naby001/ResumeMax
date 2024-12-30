import { useEffect, useState } from 'react'
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
  Work,
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ResumeIcon from '../assets/images/resume.png'
import PaperIcon from '../assets/images/paper.png'
import DraftCard from './DraftCard'
import TemplateIcon from "../assets/images/template.png";
import { setLogout } from '../state'
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[600],
    },
    background: {
      default: 'white',
      paper: 'white',
    },
    text: {
      primary: '#000000',
      secondary: '#b0b0b0',
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
  const navigate = useNavigate()
  const [drafts, setDrafts] = useState([])
  const user = useSelector((state) => state.user) || { name: 'Guest' } // Fallback for user.name
  const dispatch=useDispatch();
  const getdrafts=async()=>{
    try {
      const data={creator_id:user._id};
      const response=await fetch("http://localhost:3000/drafts/getdrafts",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      const returneddata=await response.json();

      setDrafts(returneddata.drafts);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getdrafts();
  },[]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ mt: 2, flex: 1 }}>
      <List>
        <ListItem>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src="/placeholder.svg" />
            <Box sx={{ marginLeft: 3 }}>
              <Typography variant="subtitle2" color="text.primary">
                My Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.name}
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
          color: 'rgba(255, 99, 71, 0.8)',
          borderColor: 'rgba(255, 99, 71, 0.8)',
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'rgba(255, 99, 71, 0.1)',
            borderColor: 'rgba(255, 99, 71, 1)',
          },
          transition: 'all 0.3s ease',
          borderRadius: '12px',
          fontSize: '1rem',
        }}
        onClick={()=>{
          dispatch(
                    setLogout())
                    navigate('/');
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
          { id:1,title: 'Resume Builder', description: 'Create and edit your resumes.' },
          { id:2,title: 'Explore Templates', description: 'Create Resumes on-the-go using templates' },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card
              sx={{
                mx: 'auto',
                maxWidth: 320,
                borderRadius: 3,
                height: 200,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                },
                backgroundColor: '#5c96bd',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/builder')}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    mb: 2,
                    padding: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
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
                    src={item.id==1?ResumeIcon:TemplateIcon}
                    alt="Resume"
                    style={{ width: '80px', height: '80px' }}
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
        {drafts?.map((draft, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DraftCard draft={draft} />
          </Grid>
        ))}
      </Grid>
      {drafts.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 4,
            borderRadius: '8px',
            marginTop: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2, color: 'grey' }}
          >
            Nothing Saved Yet!
          </Typography>
          <img src={PaperIcon} alt="Empty" style={{ width: '130px', height: '130px' }} />
        </Box>
      )}
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
            borderBottomRightRadius:8,
            borderBottomLeftRadius:8
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
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="h6" color="text.primary">
                Welcome
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  backgroundImage: 'linear-gradient(to right, #635acc, #ff6347)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {user.name}
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
                '& .MuiDrawer-paper': { width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { width: drawerWidth },
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
