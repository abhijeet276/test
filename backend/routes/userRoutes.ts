import express from "express"
import { UserController } from "../controllers/userController"
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);
router.route("/logout").get(UserController.logout);
router.route("/update-profile").put(isAuthenticated, UserController.updateProfile);
router.route("/getnearByUser").get(isAuthenticated, UserController.getnearByUser);
export default router;
