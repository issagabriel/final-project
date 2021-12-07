require('dotenv').config()
const jwt= require('jsonwebtoken')

const auth = (req, res, next) => {
    
    let token = req.headers.authorization.split(' ')[1]; 
    console.log('THE TOKEN', token);
  
    if (!token) {
      return res.json({ message: 'No token found' });
    }
  
    try {
     
      const decodedInfo = jwt.verify(token, process.env.SECRET);
      console.log('This info was hidden in the token', decodedInfo);
      req.user = decodedInfo.user;
      next();
    } catch (err) {
      res.json(err);
    }
  };
  
  module.exports = auth;