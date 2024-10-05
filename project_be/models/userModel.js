const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  sharedTools: [{ type: Schema.Types.ObjectId, ref: "Tools" }], // Updated
  //borrowedTools: [{ type: Schema.Types.ObjectId, ref: "Tools" }], // Updated
});

//static signup method
userSchema.statics.Join = async function (
  FirstName,
  LastName,
  Email,
  City,
  StreetName,
  PostalCode,
  Phone,
  Password
) {
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !City ||
    !StreetName ||
    !PostalCode ||
    !Phone ||
    !Password
  ) {
    throw Error("Please add all fields!");
  }
  if (!validator.isEmail(Email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(Password)) {
    throw Error("Password is not strong enough");
  }
  const userExists = await this.getUserById({ Email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  const user = await this.create({
    FirstName,
    LastName,
    Email,
    City,
    StreetName,
    PostalCode,
    Phone,

    Password: hashedPassword,
  });
  return user;
};

userSchema.statics.Login = async function (Email, Password) {
  if (!Email || !Password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOneById({ Email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(Password, user.Password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
