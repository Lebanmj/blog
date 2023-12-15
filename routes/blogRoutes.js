const express =require('express')
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController } = require('../controller/blogController')

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

module.exports =router