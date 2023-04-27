const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

const upload = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/:id", protect, getProduct);
router.get("/", protect, getProducts);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
