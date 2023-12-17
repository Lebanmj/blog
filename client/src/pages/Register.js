import React, { useState } from 'react'
import {Box,Typography,TextField,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const Register = () => {

  const navigate = useNavigate();
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:""
  })

  // handle input
  const handleChange =(e)=>{
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  // form handle

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
  const {data} = await axios.post('/api/v1/user/register',{username:inputs.name,email:inputs.email,password:inputs.password})
  if (data.success){
    alert('User register successfully')
    navigate('/login')
  }
    
   } catch (error) {
    console.log(error);
    
   }
  }
 
  return (
   
    <>
    <form onSubmit={handleSubmit}>
    <Box maxWidth={450}
    display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    margin={'auto'}
    marginTop={5}
    boxShadow={'10px 10px 20px #ccc'}
    padding={3}
    borderRadius={5}>
    
   <Typography variant='h4' sx={{textTransform:'uppercase'}} padding={3} textAlign={'center'}>Register page </Typography>
   <TextField placeholder='name'value={inputs.name}onChange={handleChange} name='name'margin='normal'type='text require'/>
   <TextField placeholder='email'value={inputs.email}onChange={handleChange} name='email'margin='normal'type='email' require/>
   <TextField placeholder='password' value={inputs.password}onChange={handleChange} require name='password'margin='normal'type='password'/>
  
   <Button type='submit' sx={{boderRadius:3 ,marginTop :3}} variant='contained' color='primary'>Submmit</Button>
   <Button  onClick={()=> navigate('/login')} sx={{boderRadius:3 ,marginTop :3}}  color='primary'>Already registered ? Please Login</Button>
   </Box>
   </form>

   </>
  )
};

export default Register