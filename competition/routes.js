const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getCompetitions);
router.post("/", controller.addCompetition);
router.get("/:id", controller.getCompetitionById);
router.put("/:id", controller.updateCompetition);
router.delete("/:id", controller.removeCompetition);
module.exports = router;
