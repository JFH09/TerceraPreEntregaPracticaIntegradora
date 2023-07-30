import { Router } from "express";
import { messageModel } from "../../dao/models/message.model.js";
import messagesController from "../../controllers/messages.controller.js";
import politicaAutorizacion from "../../middleware/authAccess.middleware.js";

const router = Router();

router.get(
  "/",
  politicaAutorizacion(["PUBLIC"]),
  messagesController.getViewMessages
);

router.post(
  "/",
  politicaAutorizacion(["USUARIO", "USER_PREMIUM"]),
  messagesController.addNewChat
);

router.get(
  "/messages",
  politicaAutorizacion(["USUARIO", "USER_PREMIUM"]),
  messagesController.getMessages
);

export default router;
