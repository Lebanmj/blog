import React, {useState} from 'react'
import {Box,AppBar,Toolbar,Button, Typography, Tabs, Tab} from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { authActions } from '../redux/store'

const Header = () => {
    // global state 
    const isLogin =useSelector(state => state.isLogin);
    const dispatch =useDispatch()
    const navigate =useNavigate()
    console.log(isLogin);


    const [value,setValue]=useState()
    const handleLogut =()=>{
      try {
        dispatch(authActions.logout())
        alert('Logout successfully')
        navigate('/login')
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>
                Blog app 
            </Typography>
           {isLogin && (
             <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
             <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
             <Tab label ='Blogs' LinkComponent={Link} to='/blogs'/>
             <Tab label ='My Blogs' LinkComponent={Link} to='/my-blogs'/>
             </Tabs>

         </Box>
           )}
            <Box display={'flex'} marginLeft='auto'>
      {!isLogin && (
        <>
                   <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/Login' >Login</Button>
                   <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/Register'>Register</Button>
                   </>
      )}
                {isLogin && (
                    <Button onClick={handleLogut} sx={{margin:1,color:'white'}}>Logout</Button>
                )}
            </Box>
        </Toolbar>

    </AppBar>
    </>
  )
}

export default Header