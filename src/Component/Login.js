import React, { useState} from 'react';
import Header from './Header';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import RetrospectService from '../Service/RetrospectService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await RetrospectService.loginUser({
        userEmail: formData.email,
        userPassword: formData.password
        
      });
  
      if (response && response.data) {
        localStorage.setItem('token', response.data);
  
        const userDetailsResponse = await RetrospectService.getUserByToken(response.data);
     
        const userEmail = userDetailsResponse.data.userEmail;
        const userName = userDetailsResponse.data.userName;
        localStorage.setItem('userEmail', userEmail); // Store userEmail in local storage
        localStorage.setItem('userName', userName )
  
        setUserEmail(userEmail);
  
        const userId = userDetailsResponse.data.userId;
        const userRole = userDetailsResponse.data.userRole;
  
        navigate(`/dashboard/${userId}/${userRole}`);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };
  // useEffect(() => {
  //   console.log('User email:', userEmail); // Print userEmail for debugging
  // }, [userEmail]);

  return (
    <>
      <Header userEmail={userEmail} /> {/* Pass userEmail to Header */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          backgroundColor="#f2f2f2"
          height={300}
          width={400}
          marginTop='5%'
          marginBottom='2%'
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          borderRadius={1}
          sx={{ border: '1px solid black' }}
        >
          <Typography variant='h6' fontWeight='bold' color='#393e46'>
            Login
          </Typography>
          <Box display='flex' alignItems='center' marginTop={4} marginBottom={4}>
            <TextField name="email" value={formData.email} onChange={handleChange} variant='outlined' size='small' placeholder='Enter your Email...' sx={{ '& input': { padding: '5px 35px' }, backgroundColor: 'white' }} />
          </Box>
          <Box display='flex' alignItems='center' marginTop={2} marginBottom={4}>
            <TextField name='password' type='password' value={formData.password} onChange={handleChange} variant='outlined' size='small' placeholder='Enter your Password...' sx={{ '& input': { padding: '5px 35px' }, backgroundColor: 'white' }} />
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ justifyContent: 'center', borderRadius: '20px' }}>
            Login
          </Button>
          {error && (
            <Typography variant="body1" color="error" sx={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="left" marginBottom={4} marginLeft={2} marginTop={2} color={'grey'}>
            <span style={{ fontStyle: 'italic' }}> Don't have an account: </span>
            <Link component={RouterLink} to="/registration" color="primary" underline="none">
              Click Here
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;