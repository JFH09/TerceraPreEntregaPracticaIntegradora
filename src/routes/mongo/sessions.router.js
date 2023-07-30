import { Router } from "express";
import userModel from "../../dao/models/user.js";
import passport from "passport";
import sessionsController from "../../controllers/sessions.controller.js";
import politicaAutorizacion from "../../middleware/authAccess.middleware.js";

const router = Router();

router.get(
  "/github",
  politicaAutorizacion(["PUBLIC"]),
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionsController.gitHub
);

router.get(
  "/githubcallback",
  politicaAutorizacion(["PUBLIC"]),
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionsController.githubcallback
);

router.post(
  "/register",
  politicaAutorizacion(["PUBLIC"]),
  passport.authenticate("register", { failureRedirect: "/login" }),
  sessionsController.register
);

router.post(
  "/login",
  politicaAutorizacion(["PUBLIC"]),
  passport.authenticate("login"),
  sessionsController.login
);

router.get(
  "/user/:id",
  politicaAutorizacion(["PUBLIC"]),
  sessionsController.getInfoUserById
);

router.get(
  "/logoutSession",
  politicaAutorizacion(["PUBLIC"]),
  sessionsController.logoutSession
);

export default router;
