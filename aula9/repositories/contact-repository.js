const db = require("../main/infra/mongodb");

exports.find = () => {
  return db.ContactModel.find();
};

exports.findById = (id) => {
  return db.ContactModel.findOne({ id });
};

exports.findByEmail = (email) => {
  return db.ContactModel.find({ email });
};

exports.create = (contact) => {
  return db.ContactModel.create(contact);
};

exports.updateOne = (id, contact) => {
  return db.ContactModel.updateOne({ id }, contact);
};

exports.deleteOne = (id) => {
  return db.ContactModel.deleteOne({ id });
};
