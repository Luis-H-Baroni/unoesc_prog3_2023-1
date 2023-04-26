const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/contacts");

const contactSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: Number,
});

const ContactModel = mongoose.model("contactSchema", contactSchema);

module.exports = { Mongoose: mongoose, ContactModel: ContactModel };
