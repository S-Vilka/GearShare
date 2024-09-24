const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    City: { type: String, required: true },
    StreetName: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

//static signup method
userSchema.statics.Join = async function (
  FirstName,
  LastName,
  Email,
  City,
  StreetName,
  PostalCode,
  Password
) {
  if(
    !FirstName ||
    !LastName ||
    !Email ||
    !City ||
    !StreetName ||
    !PostalCode ||
    !Password 
  ){
    throw Error("Please add all fields!")
  }
  if (!validator.isEmail(Email)){
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(Password)){
    throw Error("Password is not strong enough");
  }
  const userExists = await this.getUserById({Email});

  if (userExists){
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt)

  const user = await this.create({
    FirstName,
    LastName,
    Email,
    City,
    StreetName,
    PostalCode,
    Password: hashedPassword
  });
  return user;
}

userSchema.statics.Login = async function (Email, Password){
if (!Email || !Password){
  throw Error ("All fields must be filled");
}
const user = await this.findOneById({Email});
if (!user) {
  throw Error("Incorrect Email");
}

const match = await bcrypt.compare(Password, user.Password);
if (!match){
  throw Error ("Incorrect password");
}

return user;
};
  







module.exports = mongoose.model("User", userSchema);
