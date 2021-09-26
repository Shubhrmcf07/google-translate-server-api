const router = require("express").Router();
const { translate } = require("bing-translate-api");
const translateController = require("../controller/translate");

router.get("/", translateController.test);
router.post("/", translateController.translation);
// router.get("/list", translateController.sqltest);

module.exports = router;
