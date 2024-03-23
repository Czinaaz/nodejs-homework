import express from "express";

import authMiddleware from "../../middleware/autMiddleware.js";
import { logOut } from "../../controllers/users/logOut.js";
import { logIn } from "../../controllers/users/logIn.js";
import { signUp } from "../../controllers/users/signUp.js";
import { current } from "../../controllers/users/current.js";
import { updateUserAvatar } from "../../controllers/users/updateUserAvatar.js";
import { uploadMiddleware } from "../../config/multerConfing.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.get("/logout", authMiddleware, logOut);

router.get("/current", authMiddleware, current);

router.patch(
  "/avatar",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updateUserAvatar
);

export { router };