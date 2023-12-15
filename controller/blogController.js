const blogModel =require('../models/blogModel')


// get all controller
exports.getAllBlogsController = async (req,res) =>{
    try{
        const blogs =await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'no blog found'
            })
        }
        return res.state(200).send({
            success:true,
            BlogCount:blogs.length,
            message:'all blog list',
            blogs,
        })

    } catch (error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error while getting blogs',
            error,
        })
    }

}
exports.createBlogController =() =>{

}
exports.updateBlogController =() =>{

}
exports.getBlogByIdController =() =>{

}
exports.deleteBlogController =() =>{

}
