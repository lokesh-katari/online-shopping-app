import React from "react";
import ReactStars from "react-rating-stars-component";
import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../features/Products/Product";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer,toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { addToCart } from "../features/Cart/cart";
const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const productDetails = useSelector((state) => state.products.productDetails);
  const [value, setvalue] = useState(1);

  const handleaddToCart = () => {
    toast("Added to Cart",{ position: "bottom-right" });
   dispatch(addToCart(id,value));//since it is a function containing dispatch as a dependencies so we should dispatch the function to calling it
    console.log("added to cart");
  };
  const handleDecrement = () => {
    if (value <= 1) {
      setvalue(1);
    } else {
      setvalue(value - 1);
    }
  };
  const handleIncrement = () => {
    if (value >= productDetails.stock) {
      setvalue(value);
    } else {
      setvalue(value + 1);
    }
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <>
          <ContentLoader />
        </>
      ) : (
        <>
         <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
          <section className="text-gray-600 dark:bg-gray-900 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="APPLE iPhone 11 (White, 128 GB)"
                  className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                  src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/product-overview/iphone-11-256-u-mwm82hn-a-apple-0-original-imafkg25mhaztxns.jpeg?q=90"
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                    Apple
                  </h2>
                  <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                    {productDetails.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="text-gray-600 dark:text-gray-300 ml-3">
                      <ReactStars
                        count={5}
                        isHalf={true}
                        value={productDetails.ratings}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                      />
                      {productDetails.ratings} (ratings)
                    </span>
                  </div>
                  <p className="leading-relaxed dark:text-gray-300">
                    {productDetails.description}
                  </p>
                  <div className="flex m-6">
                    <button
                      className="text-white text-4xl border-solid border-2 border-white p-4"
                      onClick={handleDecrement}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <div className="flex items-center justify-center text-white text-bold p-5">
                      {value}
                    </div>
                    <button
                      className="text-white text-2xl border-solid border-2 border-white p-4"
                      onClick={handleIncrement}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                      &#8377; {productDetails.price}/-
                    </span>
                    <button
                      className={
                        productDetails.stock < 1
                          ? "ml-auto rounded-md bg-red-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white cursor-not-allowed opacity-50 "
                          : "ml-auto rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white "
                      }
                      onClick={handleaddToCart}
                    >
                      {productDetails.stock < 1
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ReviewCard reviews={productDetails.reviews} loading={loading} />
        </>
      )}
    </>
  );
};

export default ProductDetails;
