const router = require("express").Router();
const userController = require("../../controllers/accountController");

// Matches with "/api/books"
router.route("/")
	.get(accountController.findAll)
	.post(accountController.create);

// Matches with "/api/account/:id"
router
	.route("/:id")
	.get(accountController.findById)
	.put(accountController.update)
    .delete(accountController.remove);
    
    router
    .route("/signup")
    .post(accountController.create);

    router
    .route("/signin")
    .get(accountController.findById);

    router
    .route("/verify")
    .get(accountController.findById)
    .post(accountController.create)
    .delete(accountController.remove);

module.exports = router;

