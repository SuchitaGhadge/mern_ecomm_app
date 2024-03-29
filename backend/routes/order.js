const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAdmin,
  isAuthenticated,
} = require("../controllers/authentication");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// actual routes
// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

// status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.puut("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)


module.exports = router;