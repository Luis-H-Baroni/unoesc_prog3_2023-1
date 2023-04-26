const { Router } = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  findContactByEmail,
  deleteContact,
} = require("../../controllers/contact-controller");
const router = Router();

router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
router.route("/:email").get(findContactByEmail);

module.exports = router;
