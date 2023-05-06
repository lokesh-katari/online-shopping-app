const express = require('express');
const { createProduct, Getallproducts, updateProduct, deleteProduct, GetproductDetails, createProductReview } = require("../controllers/productControllers");
const isAuthenticated = require('../middleware/isAuthenticated');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();
console.log("this is pordsuctRoutes");

router.route('/admin/products/new').post(isAuthenticated,roleAuth("admin"), createProduct);
router.route('/products').get(Getallproducts);
//instead of writjing the routtes as below for the same route try this  ||
// router.route('/products/:id').put(updateProduct);                   ||
// router.route('/products/:id').delete(deleteProduct);               ||
// router.route('/products/:id').get(GetproductDetails);            \\//  
router.route('/admin/products/:id').put(isAuthenticated,roleAuth("admin"),updateProduct).delete(isAuthenticated,roleAuth("admin"),deleteProduct);

router.route('/products/:id').get(GetproductDetails);
router.route('/products/createReview').put(isAuthenticated,createProductReview);

module.exports = router;  
