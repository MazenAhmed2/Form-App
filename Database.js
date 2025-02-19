import mongoose from "mongoose";

mongoose.connect("");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("users", schema);

async function checkEmail(email, callback) {
  let result = await model.findOne({ email: email.toLowerCase() });
  if (!result) return callback();
  else return callback(result);
}

export default { model, checkEmail };
