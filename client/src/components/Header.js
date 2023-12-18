import React, {useState} from 'react'
import {Box,AppBar,Toolbar,Button, Typography, Tabs, Tab} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';

const Header = () => {
    // global state 
    let isLogin =useSelector(state => state.isLogin);
    isLogin =isLogin ||localStorage.getItem('userId');
    const dispatch =useDispatch()
    const navigate =useNavigate()
    console.log(isLogin);


    const [value,setValue]=useState()
    const handleLogut =()=>{
      try {
        dispatch(authActions.logout())
        toast.success('Logout successfully')
        navigate('/login')
        localStorage.clear();
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
             <Tab label ='Create Blogs' LinkComponent={Link} to='/create-blog'/>
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