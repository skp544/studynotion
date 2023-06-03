// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifySignature,
} = require("../controllers/paymentsController");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/authMiddle");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
