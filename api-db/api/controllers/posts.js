const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog')

// Routre for retrieving all actor entries
router.get('/', async(req,res)=>{
    try{
        const blogs = await Blog.all
        res.json({blogs})
    }
    catch(err){
        res.status(500).json({err})
    }
})

// Routre for finding by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(parseInt(req.params.id))
        res.json(blog)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Routre for creating actor entry
router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body.title, req.body.content, req.body.name)
        res.json(blog)
    } catch(err) {
        res.status(404).json({err})
    }
})



module.exports = router;