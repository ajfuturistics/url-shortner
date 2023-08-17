const express = require("express");
const { getUrl } = require("../controller/urlController");

const router = express.Router();

router.route("/:id").get(getUrl);

module.exports = router;
