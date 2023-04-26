const { contactRepository } = require("../repositories");
const { randomUUID } = require("crypto");
exports.getContacts = async (req, res) => {
  const contacts = await contactRepository.find();
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  const newContact = await contactRepository.create({
    id: randomUUID(),
    ...req.body,
  });
  res.json(newContact);
};

exports.updateContact = async (req, res) => {
  const updatedContact = await contactRepository.updateOne(
    req.params.id,
    req.body
  );
  res.json(updatedContact);
};

exports.deleteContact = async (req, res) => {
  const deletedContact = await contactRepository.deleteOne(req.params.id);
  res.json(deletedContact);
};

exports.findContactByEmail = async (req, res) => {
  const contacts = await contactRepository.findByEmail(req.params.email);
  res.json(contacts);
};
