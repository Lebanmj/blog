import React, { useState } from 'react'
import {Box,Typography,TextField,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from "react-redux";
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [inputs,setInputs]=useState({
   
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
  const {data} = await axios.post('/api/v1/user/login',{email:inputs.email,password:inputs.password})
  if (data.success){
    localStorage.setItem('userId',data?.user._id)
    dispatch(authActions.login());

    toast.success('User Login successfully')
    navigate('/')
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
    
   <Typography variant='h4' sx={{textTransform:'uppercase'}} padding={3} textAlign={'center'}>Login  </Typography>
   
   <TextField placeholder='email'value={inputs.email}onChange={handleChange} name='email'margin='normal'type='email' require/>
   <TextField placeholder='password' value={inputs.password}onChange={handleChange} require name='password'margin='normal'type='password'/>
  
   <Button type='submit' sx={{boderRadius:3 ,marginTop :3}} variant='contained' color='primary'>Submmit</Button>
   <Button  onClick={()=> navigate('/register')} sx={{boderRadius:3 ,marginTop :3}}  color='primary'>Not User? Go to login page</Button>
   </Box>
   </form>

   </>
  )
};

export default Login