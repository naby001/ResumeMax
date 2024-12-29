import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { WorkOutline } from '@mui/icons-material';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from "../assets/images/origami.png";
function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
   
    const data={ name, email, college, password };
    if(!isLogin)
    {try {
      const response=await fetch(`https://resumemaxbackend.onrender.com/auth/signup`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      const retureneddata=await response.json();
      console.log(retureneddata);
      dispatch(
        setLogin({
        user: retureneddata,
       
      })
    );
    navigate("/dash");
    } catch (error) {
      
    }}
    else
    {
      try {
        const response=await fetch(`https://resumemaxbackend.onrender.com/auth/login`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        });
        const retureneddata=await response.json();
        console.log(retureneddata);
        dispatch(
          setLogin({
          user: retureneddata,
         
        })
      );
      navigate("/dash");
      } catch (error) {
        
      }

    }

   
    setIsLoading(false);
  };

  const toggleAuthPage = () => {
    setIsLogin(!isLogin); // Toggle between Login and Sign Up
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#ffffff', // Black background
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 300,
          height: 300,
        }}
      >
        
      </Box>

      <Container maxWidth="sm" sx={{ mx: 2 }}>
        <Card
          sx={{
            bgcolor: '#000000', // Black card
            color: '#ffffff', // White text
            border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
            borderRadius: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{display:'flex', justifyContent:'center'}}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mt:3, fontWeight: 'bold', color: '#ffffff' }}
              >
                Resume
              </Typography>
               <img src={logo} style={{
        height: '90px',
        width: '90px',
        //filter: 'brightness(0) invert(1)', // Ensures icon is white for a black background
        marginRight: '8px',
      }}/>
      <Typography
                variant="h4"
                component="h1"
                sx={{ mt:3, fontWeight: 'bold', color: '#ffffff' }}
              >
                Kraft
              </Typography>
      
              </Box>
              
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 1, fontWeight: 'bold', color: '#ffffff' }}
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </Typography>
             
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {!isLogin && (
                <>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                      sx: { color: 'rgba(255, 255, 255, 0.7)' },
                    }}
                    InputProps={{
                      sx: {
                        color: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
                          },
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="College"
                    variant="outlined"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                      sx: { color: 'rgba(255, 255, 255, 0.7)' },
                    }}
                    InputProps={{
                      sx: {
                        color: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
                          },
                        },
                      },
                    }}
                  />
                </>
              )}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  bgcolor: '#ffffff',
                  color: '#000000',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                  borderRadius: '20px',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isLogin ? (
                  'Log in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="text"
                onClick={toggleAuthPage}
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Log In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AuthPage;
