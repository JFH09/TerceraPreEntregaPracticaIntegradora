import { Router } from "express";
import loginRegisterController from "../../controllers/loginRegister.controller.js";
import politicaAutorizacion from "../../middleware/authAccess.middleware.js";

const router = Router();

router.get(
  "/register",
  politicaAutorizacion(["PUBLIC"]),
  loginRegisterController.getViewRegister
);

router.get(
  "/",
  politicaAutorizacion(["PUBLIC"]),
  loginRegisterController.getViewRoot
);

router.get(
  "/login",
  politicaAutorizacion(["PUBLIC"]),
  loginRegisterController.getViewLogin
);

export default router;
