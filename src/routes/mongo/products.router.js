import { Router } from "express";
import productsController from "../../controllers/products.controller.js";
import politicaAutorizacion from "../../middleware/authAccess.middleware.js";

const router = Router();

router.get(
  "/productsList",
  politicaAutorizacion(["PUBLIC"]),
  productsController.getProducts
);

router.get(
  "/:id",
  politicaAutorizacion(["PUBLIC"]),
  productsController.getProductById
);

router.get(
  "/product/:product",
  politicaAutorizacion(["PUBLIC"]),
  productsController.getProductByName
);

router.post(
  "/",
  politicaAutorizacion(["ADMINISTRADOR"]),
  productsController.addNewProduct
);

router.put(
  "/:id",
  politicaAutorizacion(["ADMINISTRADOR"]),
  productsController.updateProductById
);

router.put(
  "/user/:id",
  politicaAutorizacion(["PUBLIC"]),
  productsController.updateProductByIdUser
);
//solo puede eliminar un administrador...
router.delete(
  "/:id",
  politicaAutorizacion(["ADMINISTRADOR"]),
  productsController.deleteProductById
);

router.get(
  "/",
  politicaAutorizacion(["PUBLIC"]),
  productsController.getViewProducts
);

export default router;
