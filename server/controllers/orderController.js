const Order = require("../Models/OrderSchema");
const Product = require("../Models/ProductModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");

const createOrder = catchAsyncError(async (req, res) => {
  const {
    shippingInfo,
    phonenumber,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const newOrder = await Order.create({
    shippingInfo,
    phonenumber,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    orderedAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({ success: true, newOrder });
});

//get all order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name Email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({ success: true, order });
});

//get single user order
const myOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new ErrorHandler("no orders has been placed", 404));
  }
  res.status(200).json({ success: true, order });
});

// get all Orders -- Admin
const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.orderStatus === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.deliveryDate = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  console.log(order);
  await order.deleteOne({_id:req.params.id});

  res.status(200).json({
    success: true,
  });
});

module.exports= {deleteOrder,getAllOrders,getSingleOrder,updateOrder,myOrders,createOrder}