import React from "react";
import ReactStars from "react-rating-stars-component";
import ContentLoader from "react-content-loader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link ,useSearchParams,useNavigate } from "react-router-dom";

const { fetchProducts } = require("../features/Products/Product");

const Products = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  useEffect(() => {
    if(keyword){
      dispatch(fetchProducts(keyword));
      navigate(`/products?keyword=${keyword}`);
    }
    else{
      dispatch(fetchProducts())
    }
  }, [dispatch,keyword,navigate]);

  if (error) {
    return (
      <>
        <div>
          <h1>error in page</h1>
        </div>
      </>
    );
  }
  // if (loading) {
  //   return (
  //     <>
  //       <div>
         
  //       </div>
  //     </>
  //   );
  // }

  return (
 <>
 
 { loading ?(
  
  <ContentLoader/>
  ):
  <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    {/* Head */}
    <div className="flex items-center justify-center lg:justify-between">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Electronics &amp; Personal Computing
      </h2>

      <div className="hidden lg:flex">
        <Link
          to="/"
          title=""
          className="inline-flex items-center justify-center p-1 -m-1 text-sm font-bold text-gray-600 dark:text-gray-100 transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
        >
          View All
          <svg
            className="w-5 h-5 ml-2 text-gray-400 dark:text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
    {/* Products */}
    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:mt-10">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-500 rounded-xl group"
        >
          <div className="absolute z-10 top-3 right-3">
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="relative ">
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="object-contain w-full h-52 p-4"
                src={product.imageSrc}
                alt={product.imageAlt}
              />
            </div>

            <div className="px-6 py-4 flex-1 flex flex-col">
              <p className="text-xs font-medium tracking-widest text-gray-500 dark:text-gray-300 uppercase">
                {product.category}
              </p>
             { console.log()}
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                <Link to={window.location.pathname === '/products' ?`${product._id}`:`products/${product._id}`} title="">
                  {product.name}
                </Link>
              </h3>
              <div className="flex items-center mt-2.5">
                <ReactStars
                  count={5}
                  isHalf={true}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                  value={product.ratings}
                />
                <p className="text-sm font-medium text-gray-500 ml-1.5 dark:text-gray-300">
                  ({product.ReviewNum}) Reviews
                </p>
              
              </div>
              <p className="mt-5 text-sm font-bold text-gray-900 dark:text-white">
                &#8377; {product.price}/-
              </p>
            </div>
          </div>
          <div className="">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-indigo-600"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
    {/* Small Screen View All */}
    <div className="mt-12 text-center lg:hidden">
      <Link
        to="/"
        title=""
        className="inline-flex items-center justify-center p-1 text-sm font-bold text-gray-600 transition-all duration-200 rounded-md focus:text-gray-900 focus:ring-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none hover:text-gray-900"
      >
        View all
        <svg
          className="w-5 h-5 ml-2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  </div>
</section>  
  
}
 </>
  );
};

export default Products;
