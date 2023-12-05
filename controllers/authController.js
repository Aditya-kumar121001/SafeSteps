const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const cookie = require("cookie-parser")
// Mock users (for demonstration purposes, replace with actual user authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin1', password: 'adminpassword1', role: 'admin' }
  ];
  
  // Controller functions
  const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        console.log("all feilds are mandatory")
    }
    const user = await User.findOne({email})

    //compare entered password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
              user: {
                username: user.username,
                email: user.email,
                id: user.id,
              },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        ); 
        console.log(`accessToken: ${accessToken}`);

        res.cookie("token",accessToken,{
            httpOnly:true,
            expires: new Date(Date.now()+60*1000)
        })
    }
    else {
          console.log("email or password is not valid");
    }
    res.redirect("/logout")
});

module.exports = {loginUser}