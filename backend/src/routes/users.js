const express = require("express");

const router = express.Router();
const UsersController = require("../controllers/users/UsersController");
const validator = require("../middlewares/joi/joiValidator");
const schemas = require("../service/joi/schemas/schemas");

/* GET user. */
router.get("/", UsersController.getAllUsers);

router.post(
  "/",
  validator.joiObjectValidator(schemas.userSchemas.create, "user"),
  UsersController.userCreate
);

router.post(
  "/signin",
  validator.joiObjectValidator(schemas.userSchemas.signIn, "user"),
  UsersController.userSignIn
);

router.get(
  "/:user_id",
  validator.joiIdValidator("user_id"),
  UsersController.getUserById
);

router.put(
  "/:user_id/update",
  validator.joiIdValidator("user_id"),
  validator.joiObjectValidator(schemas.userSchemas.update, "user"),
  UsersController.userUpdate
);

router.delete(
  "/:user_id",
  validator.joiIdValidator("user_id"),
  UsersController.userDelete
);

module.exports = router;
