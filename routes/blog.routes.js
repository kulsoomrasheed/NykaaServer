const express= require('express')
const { BlogPostModel } = require('../model/user.model')
const { auth } = require('../middlewares/auth.middleware')
const blogPostRouter = express.Router()
blogPostRouter.use(auth)

blogPostRouter.get("/",async(req,res)=>{
    try {
        const doctors = await BlogPostModel.find();
        res.json({msg:"Success",doctors});
      } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'An error occurred while fetching doctors' });
      }
})

blogPostRouter.post("/",async(req,res)=>{
    const user=req.body.user
    console.log(user)
    const { title,content,comments,likes,date,category}= req.body
    try{
    const employee= new BlogPostModel({ user,title,comments,likes,date,content,category})
    await employee.save()
    res.json({msg:"A new doctor has been added"})
    }catch{
        res.json({msg:"Error saving doctor"})

    }
})


blogPostRouter.patch("/:id",async(req,res)=>{
        let ID=req.params.id
        let payload=req.body
        let data =await BlogPostModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
                 if((userID_post==userID_req)){
                    await BlogPostModel.findByIdAndUpdate({
                     _id:ID
                },payload)
                res.send(`doctor with ${ID} is updated`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })
    blogPostRouter.delete("/:id",async(req,res)=>{
        let ID=req.params.id
        let data =await BlogPostModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
            
                 if((userID_post==userID_req)){
                    await BlogPostModel.findByIdAndDelete({
                     _id:ID
                })
                res.send(`doctor with ${ID} is deleted`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })


    blogPostRouter.get('/', async (req, res) => {
        const { title } = req.query;
      
        try {
          const posts = await BlogPostModel.find({ title: { $regex: title, $options: 'i' } });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

      blogPostRouter.get('/', async (req, res) => {
        const { category } = req.query;
      
        try {
          const posts = await BlogPostModel.find({
            category: { $regex: category, $options: 'i' },
          });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

      blogPostRouter.get('/api/blogs', async (req, res) => {
        const { sort, order } = req.query;
      
        try {
          const sortOrder = order === 'asc' ? 1 : -1;
          const posts = await BlogPostModel.find().sort({ [sort]: sortOrder });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

module.exports={
    blogPostRouter
}