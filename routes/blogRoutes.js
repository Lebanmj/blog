const express =require('express')
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controller/blogController')

// routes objects
const router =express.Router()

// routes

// get all blogs
router.get('/all-blog',getAllBlogsController)

// post
router.post('/create-blog',createBlogController)

router.put('/update-blog/:id',updateBlogController)

router.get('/get-blog/:id',getBlogByIdController)

router.delete('/delete-blog/:id',deleteBlogController)

router.get('/user-blog/:id',userBlogController)

module.exports =router