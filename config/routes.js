const express = require("express");
const router = express.Router();
const api = require("../app/controllers/api/v1/");
const { accessControl } = require("../app/controllers/api/v1/usersController");

// API PRODUCT
router.get(
  "/product",
  api.usersController.authorize(accessControl.admin),
  api.productController.getAllProduct
);

// API KATEGORI
router.get(
  "/kategori",
  api.usersController.authorize(accessControl.admin),
  api.productController.getAllKategori
);
router.get(
  "/kategori/:id",
  api.usersController.authorize(accessControl.admin),
  api.productController.getAllKategoriById
);

// API STOCK
router.get(
  "/allstock",
  api.usersController.authorize(accessControl.admin),
  api.productController.getStockProduct
);

// API SALES
router.get(
  "/salesbymonth",
  api.usersController.authorize(accessControl.admin),
  api.productController.getSalesByMonth
);
router.get(
  "/allsales",
  api.usersController.authorize(accessControl.admin),
  api.productController.getAllSales
);

// API USER
router.post("/users/v1/login", api.usersController.loginCustomer);
router.post(
  "/users/v1/logout",
  api.usersController.authorize(accessControl.admin),
  api.usersController.logout
);
module.exports = router;
