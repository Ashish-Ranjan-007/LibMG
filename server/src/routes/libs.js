import express from "express";
import mongoose from "mongoose";
import { BooksModel } from "../models/Books.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";
import mailer from "./mailer.js"
const router = express.Router();

router.get("/showbooks", async (req, res) => {
  try {
    const result = await BooksModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


//issue book  - pending

router.post('/issue', async (req, res) => {

  try {
      const username = req.body.username;
      console.log(username)
      const title = req.body.title;
      const book = await BooksModel.findOne({ title });
      const finduser = await UserModel.findOne({ username })
      console.log(finduser)
      if (!book) return res.status(404).send('Book not found');
      if (book.isIssued) return res.status(400).send('Book is already issued');
      //setting book issue status 
      book.isIssued = true;
      book.issuedTo = req.body.issuedTo;
      //listing users ID who have issued the book 
      book.issuehistory.push(finduser);
      await book.save();
      mailer();
      res.send(book);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


  // create a new book 
  
 router.post('/create', async (req, res) => {

  

    const book = new BooksModel({
        title: req.body.title,
        author: req.body.author,
        issueto: "",
        status: false,
        issuehistory:"",
        
        });

    try {
      const bookname = req.body.title
      const checkbook = await BooksModel.findOne({bookname});
      console.log(checkbook)
      if(checkbook){
        res.status(400).json({message: "Book already exist"});
      
    }

    const result = await book.save();
    res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// get all book 

router.get('/showbooks', async (req, res) => {
  const books = await BooksModel.find();
  res.send(books);

});

//delete a book 
router.put('/delete', async (req, res) => {
  try {
      const title = req.body.title;
      const checkbook = await BooksModel.findOne({title});
      if (!checkbook) return res.status(404).send('Book not found');
      const book = await BooksModel.deleteOne({title});
      res.send(book);
  } catch (error) {
      res.status(500).send(error.message); 
  }
});



// Return a book - pending
router.post('/return', async (req, res) => {
  try {
    const title = req.body.title;
    const checkbook = await BooksModel.findOne({title});
    
      if (!checkbook) return res.status(404).send('Book not found');
      if (!checkbook.isIssued) return res.status(400).send('Book is not issued');

      checkbook.isIssued = false;
      checkbook.issuedTo = null;

      await checkbook.save();
      res.send(checkbook);
  } catch (error) {
      res.status(500).send(error.message);
  }
});
export { router as libsRouter };