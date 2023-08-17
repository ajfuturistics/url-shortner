const express = require("express");
const {
  shortenUrl,
  getUrlData,
  updateUrlData,
  getAllUserUrls,
} = require("../controller/urlController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/shorten")
  .get(isAuthenticatedUser, getAllUserUrls)
  .post(isAuthenticatedUser, shortenUrl);
router
  .route("/shorten/:id")
  .get(isAuthenticatedUser, getUrlData)
  .put(isAuthenticatedUser, updateUrlData);

module.exports = router;
