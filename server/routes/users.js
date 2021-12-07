var express = require('express');
var router = express.Router();
const User = require('../models/User')
const auth = require('../middleware/auth')

require('dotenv').config();

const bcrypt = require('bcrypt')
const bcryptSalt = 10

const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', function (req, res, next) {
  console.log('BODY', req.body)
  
  
  const {username, password}= req.body
  
  
  
  if(!username || !password){
    res.json({error:"Username and password are required"})
  }
  
  
  const salt = bcrypt.genSaltSync(bcryptSalt)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const userToCreate = new User({
    username: username,
    password: hashedPassword
  })

  
  User.create(userToCreate)
    .then((newlyCreatedUser) => {
      
      console.log(newlyCreatedUser.id)
      
      const payload = {
        user: {
          id: newlyCreatedUser.id
        }
      }
      
      jwt.sign(
        payload, 
        process.env.SECRET, 
        {expiresIn: 3600000}, 
        (err, token) =>{
          if(err) throw err;
          else{
            res.json({ token, id: newlyCreatedUser.id , success: true})
          }
        }
      )
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.json(err);
    });

});
      
router.post('/login', (req, res) => {
  const {username, password}= req.body
  
  if(!username || !password){
    res.json({error:"Username and password are required"})
  }

  User.findOne({username: username})
    .then(foundUser=>{
      
      if(!foundUser){
        res.json({message:"Username not found"})
      }

      const passMatch=bcrypt.compareSync(password, foundUser.password)
      if (!passMatch){
        res.json({message: 'improper password'})
      }

      const payload = {
        user: {
          id: foundUser.id
        }
      }
      
      jwt.sign(
        payload, 
        process.env.SECRET, 
        {expiresIn: 3600000}, 
        (err, token) =>{
          if(err) throw err;
          else{
            res.json({ token, id: foundUser.id , success: true})
          }
        }
      )
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.json(err);
    })
  })

router.get('/login-test', auth, (req, res) => {
    console.log(req.user);
    User.findById(req.user.id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
});
  
module.exports = router;
    
      
      


  




    



