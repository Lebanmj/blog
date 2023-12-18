const  mongoose  = require('mongoose')
const blogModel =require('../models/blogModel')
const userModel = require('../models/userModels')


// get all controller
exports.getAllBlogsController = async (req,res) => {
    try{
        const blogs = await blogModel.findByIdAndDelete(req.params.id).find({}).populate("user")
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'no blog found'
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:'all blog list',
            blogs,
        })

    } catch (error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error while getting blogs',
            error
        })
    }

}
exports.createBlogController = async (req,res) =>{
    try {
        const {title,description,image,user}=req.body 
        // validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success:false,
                message:"please provide all field"
            })
        }
        const existingUser =await userModel.findById(user)
        // validation
        if (!existingUser){
            return res.status(404).send({
                success:false,
                message: "unable to find user"
            })
        }

        const newBlog = new blogModel({title, description, image,user });
        const session= await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:"blog created",
            newBlog,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while creating blog",
            error
        })
        
    }

}
exports.updateBlogController = async (req,res) =>{
    try {
        const {id}=req.params
        const {title,description,image}=req.body
        const blog =await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message: "blog updated!",
            blog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating",
            error
        })
        
    }

}
exports.getBlogByIdController = async (req,res) =>{
    try {
        const {id}= req.params 
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message: "blog not found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"fe6tch single blog",
            blog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting single blog",
            error
        })
        
    }

}
exports.deleteBlogController = async (req,res) =>{
    try {
       
       const blog = await blogModel.findOneAndDelete(req.params.id).populate('user')
        await blog.user.blogs.pull(blog);
        await blog.user.save();
       
        return res.status(200).send({
            success:true,
            message:"blog deleted",
          
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting blog",
            error
        })
        
    }

}
// get user blog 

exports.userBlogController = async (req,res) =>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs')
        if (!userBlog){
            return res.status(404).send({
                success: false,
                message:"blog not found with this id"
            })

        }
        return  res.status(200).send({
            success:true,
            message: 'user blogs',
            userBlog
        })
        
    } catch (error) {
        
    }

}