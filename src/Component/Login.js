import React, { useState } from 'react'
import Header from './Header'
import Box from '@mui/material/Box';
import { Typography} from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import RetrospectService from '../Service/RetrospectService';
const Login = () => {
  const[formData, setformData] = useState({
    email : '',
    password : ''
  });
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value
    });
  };
  
  // const handleSubmit = async () => {
  //   try {
  //       const response = await RetrospectService.loginUser({
  //           userEmail: formData.email,
  //           userPassword: formData.password
  //       });

  //       if (response && response.data) {
  //           console.log(response.data);
  //           if (response.data === 'login failed') {
  //               setError("Invalid credentials");
  //           } else {
  //               localStorage.setItem('token', response.data);
  //               console.log(response.data);

  //               const userDetailsResponse = await RetrospectService.generateUserByToken(response.data);
  //               console.log("User Details Response:", userDetailsResponse); 
  //               if (userDetailsResponse && userDetailsResponse.data && userDetailsResponse.data.length > 0) {
  //                   const user = userDetailsResponse.data[0];
  //                   const userId = user.user_id;
  //                   console.log("User ID:", userId);
  //                   navigate(`/${userId}`);
  //               } else {
  //                   console.error('User ID not found in response:', userDetailsResponse);
  //                   setError("Failed to retrieve user details");
  //               }
  //           }
  //       } else {
  //           console.error('Login failed:', response);
  //           setError("Invalid credentials");
  //       }
  //   } catch (error) {
  //       console.error('Login failed:', error);
  //       setError("Invalid credentials");
  //   }
  // };

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
        localStorage.setItem('userEmail', userEmail); // Store userEmail in local storage
  
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
  
  return (
    <>
    <Header />
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
            <TextField name="email" value={formData.email} onChange={handleChange} variant='outlined' size='small' placeholder='Enter your Email...' sx={{ '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
        </Box>
        <Box display='flex' alignItems='center'  marginTop={2} marginBottom={4}>
            <TextField name='password' value={formData.password} onChange={handleChange} type='password' variant='outlined' size='small' placeholder='Enter your Password...' sx={{ '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{justifyContent:'center', borderRadius:'20px'}}>
          Login
        </Button>
        <Box display="flex" justifyContent="left" marginBottom={4} marginLeft={2} marginTop={2} color={'grey'} >
          <span style={{fontStyle:'italic'}}> Don't have a account :  </span>
          <Link component={RouterLink} to="/registration" color="primary" underline="none">
            Click Here
          </Link>
        </Box>
      </Box>
    </Box>
  </>
  )
}
export default Login