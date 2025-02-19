import express from "express";
import db from "../Database.js";
import bcrypt from "bcrypt";
import validator from "../Validator.js"
import path from "path";

const route = express.Router();


route.get('/', (req, res)=>{
  res.render('../views/login')
})

route.post("/", async (req, res) => {
  try {
    console.log(req.body)
    // fetch data from request body
    let { email, password } = validator(req.body, (error, value)=>{
      if (!error) return value
      else throw Error(error)
    });

    // search email in database
    // if exists go to next step
    // response notfound

    let hashedPassword = await db.checkEmail(email, (value)=>{
      if (!value) throw Error('this email doesn\'t exists')
      else return value.password
    })
    

    // compare the password with hashed one
    if (await bcrypt.compare(password, hashedPassword)) {} else throw Error('Wrong password')
    
    console.log("Logged In Successfully")
    res.json({success: true})
  } catch (err) {
    console.log(err);
    res.status(409).json({success: false})
  }
});

export default route;
