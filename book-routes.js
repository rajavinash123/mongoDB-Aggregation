const express=require('express');
// Adjust path as needed
const{createAuthor,createBook,getBookWithAuthor}=require('../controllers/book-controller');
const router=express.Router();

// Define your route on the router
router.post('/author' ,createAuthor);
router.post('/book',createBook);
router.get('/book/:id',getBookWithAuthor);

module.exports=router;  