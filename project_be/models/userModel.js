const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  sharedTools: [{ type: Schema.Types.ObjectId, ref: "Tools" }],
});

// static signup method
userSchema.statics.Join = async function (firstName, lastName, email, city, streetName, postalCode, phone, password) {
  if (!firstName || !lastName || !email || !city || !streetName || !postalCode || !phone || !password) {
    throw Error("Please add all fields!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    city,
    streetName,
    postalCode,
    phone,
    password: hashedPassword,
  });
  return user;
};

userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
