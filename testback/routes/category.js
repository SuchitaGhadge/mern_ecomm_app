const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require("../controllers/category");
const {
  isAdmin,
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategories)

// update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
  );

// delete
router.delete("/category/:categoryId/:userId",  isSignedIn,
isAuthenticated,
isAdmin,
removeCategory);

module.exports = router;
