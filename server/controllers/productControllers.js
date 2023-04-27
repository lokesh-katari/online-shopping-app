const Product = require("../Models/ProductModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const search = require("../functionalities/search");
const filter = require("../functionalities/filter");
const User = require("../Models/UserSchema");
//CREATE PRODUCT ONLY FOR ADMIN ACCESS
exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);
  res.status(200).json({
    success: "true",
    product,
  });
});
exports.Getallproducts = catchAsyncError(async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit);

  let skip = (page - 1) * limit;

  let query = Product.find().skip(skip).limit(limit);

  // Apply search and filter functionalities using the functions
  query = search(query, req.query);
  query = filter(query, req.query);
  const allProducts = await query;
  res
    .status(200)
    .json({ success: "true", allProducts, hits: allProducts.length });
});
exports.GetproductDetails = catchAsyncError(async (req, res, next) => {
  const productDetails = await Product.findById(req.params.id);

  if (!productDetails) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({ success: "true", productDetails });
});
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  console.log(product);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});
exports.deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});


//creating review for the product;

// exports.createProductReview =catchAsyncError(async(req,res,next)=>{
// const{rating,comment,productId}=req.body
// const review ={
//   name:req.user.name,
//   user:req.user._id,
//   rating:Number(rating),
//   comment:comment
// }
// const product =await Product.findById({_id:productId});

// // {_id: ObjectId("64462ddea771ff11e10ff8bc")}
// console.log(product.reviews);
// const isReviewed =  product.reviews.forEach(
//   (rev) => {
//     if(rev.user.toString() === req.user._id.toString()){
//       return true
//     }
//   }
// );

// console.log("this is is reviewed");
// console.log(isReviewed);
// if(!isReviewed){
//   console.log("this is review");
//   product.reviews.push(review)
//   product.ReviewNum = product.reviews.length;
//   console.log(ReviewNum);
// }
// else{
//     product.reviews.forEach((rev)=> {
//       if (rev.user.toString() === req.user._id.toString()){
//         rev.rating =rating;
//         rev.comment=comment;
//       }
//     });
// }

// let avg = 0;
// product.ratings = product.reviews.forEach((rev) => {
//     avg+= rev.rating;
//   }) / product.reviews.length;
// await product.save({ validateBeforeSave: false });
// res.status(200).json ({
//   success: true
// });

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    name: req.user.name,
    user: req.user._id,
    rating: Number(rating),
    comment: comment,
  };
  const product = await Product.findById({ _id: productId });

  console.log(product.reviews);

  const isReviewed = product.reviews.some((rev) => {
    return rev.user.toString() === req.user._id.toString();
  });

  console.log("isReviewed:", isReviewed);

  if (!isReviewed) {
    console.log("this is review");
    product.reviews.push(review);
    product.ReviewNum = product.reviews.length;
    console.log(product.ReviewNum);
  } else {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  }

  let avg=0;
  product.reviews.forEach(rev=> (avg+=rev.rating));
  product.ratings =avg/product.reviews.length;

  // Save the updated product object
  await product.save({validateBeforeSave:false});

  // Return response
  res.status(200).json({
    success: true,
    message: "Product review updated successfully.",
    product: product,
  });
});

