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

// API STOCK
router.get(
  "/stock",
  api.usersController.authorize(accessControl.admin),
  api.productController.getAllStock
);

// API USER
router.post("/users/v1/login", api.usersController.loginCustomer);
router.post(
  "/users/v1/logout",
  api.usersController.authorize(accessControl.admin),
  api.usersController.logout
);
// const {
//   allProduct,
//   createProduct,
//   productById,
//   productByUser,
//   deleteProduct,
//   cariProduct,
//   updateQuantityProducts,
// } = require("../controllers/product.js");
// const { authorize, accessControl } = require("../controllers/customer");
// router.get("/v1", allProduct);
// router.get("/v1/cari/product", allProduct);
// router.post("/v1/create", createProduct);
// //  createProduct);
// router.get(
//   "/v1/seller/allproduct",
//   authorize(accessControl.admin),
//   productByUser
// );
// router.get("/v1/:id", productById);
// router.delete("/v1/delete/:idp", deleteProduct);
// router.get("/v1/cari/product=:cp", cariProduct);
// router.put("/v1/update/product=:idUpdate", updateQuantityProducts);
module.exports = router;
