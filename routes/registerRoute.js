import express from "express";
import db from "../Database.js";
import bcrypt from "bcrypt";
import validator from "../Validator.js";
import { error } from "console";

const route = express.Router();

route.get("/", (req, res) => {
  res.render("../views/register");
});

route.post("/", async (req, res) => {
  try {
    // fetch data from request
    let { email, password } = validator(req.body, (error, value) => {
      if (!error) return value;
      else throw Error(error);
    });

    await db.checkEmail(email, (value) => {
      if (value) throw Error("this email is already exists");
    });

    // hash the password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // store email and password in db
    await db.model.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log("Data inserted Successfully");
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(409).json({ success: false });
  }
});

export default route;
