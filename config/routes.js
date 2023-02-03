const express = require("express");
const router = express.Router();
const api = require("../app/controllers/api/v1/");
const { accessControl } = require("../app/controllers/api/v1/usersController");

// API PRODUCT
router.get(
  "/product",
  //   api.usersController.authorize(accessControl.admin),
  api.productController.getAllProduct
);

// API KATEGORI
router.get(
  "/kategori",
  //   api.usersController.authorize(accessControl.admin),
  api.productController.getAllKategori
);

// API STOCK
router.get(
  "/stock",
  //   api.usersController.authorize(accessControl.admin),
  api.productController.getAllStock
);
router.get("/allstock", api.productController.getStockProduct);

// API SALES
router.get("/salesbymonth", api.productController.getSalesByMonth);

// API USER
router.post("/users/v1/login", api.usersController.loginCustomer);
router.post(
  "/users/v1/logout",
  api.usersController.authorize(accessControl.admin),
  api.usersController.logout
);
module.exports = router;
