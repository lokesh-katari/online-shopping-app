const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const roleAuth = require('../middleware/roleAuth');
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.route("/order/new").post(isAuthenticated ,createOrder)
router.route("/order/getsingleOrder/:id").get(isAuthenticated ,getSingleOrder)
router.route("/order/myOrders").get(isAuthenticated ,myOrders)
router.route("/admin/order/allOrders").get(isAuthenticated,roleAuth("admin"),getAllOrders)
router.route("/admin/order/updatestatus/:id").put(isAuthenticated,roleAuth("admin"),updateOrder);
router.route("/admin/order/deleteOrder/:id").delete(isAuthenticated,roleAuth("admin"),deleteOrder);


module.exports = router;  