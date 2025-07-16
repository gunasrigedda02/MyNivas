const express = require("express");
const router = express.Router();
const { requestRegistrationOTP, verifyRegistrationOTP, loginUser, forgotPassword, verifyOTP, resetPassword, getAllUserIdsAndNames, getAllUsersFullDetails } = require("./controller");

router.post("/request-otp", requestRegistrationOTP);
router.post("/verify-registration-otp", verifyRegistrationOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get('/users/ids-names', getAllUserIdsAndNames);
router.get('/users/full-details', getAllUsersFullDetails);

module.exports = router;