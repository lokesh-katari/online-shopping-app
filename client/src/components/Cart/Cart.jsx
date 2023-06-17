import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCartItem,setTotalPrice} from "../../features/Cart/cart";
import { useEffect } from "react";
	
import { ToastContainer,toast } from "react-toastify";
const Cart = () => {
  const dispatch = useDispatch();
  let product = useSelector((state) => state.cart.cartItems);
  const handleremoveCartItem=(id)=>{
    dispatch(removeCartItem(id)); 
    console.log(id);;
    console.log("item removed ");
    toast.success("Item REmoved")
    
  }
  const [products, setproducts] = useState(product);
  // const totalPrice=products.map((item)=>item.price*item.qty)
  // console.log(totalPrice);
  // console.log();
  function totalProducts(array) {
    let sum = 0;
    array.forEach((element) => {
      sum +=element.price*element.qty;
    });
    return sum;
  }
  let totalPrice=0
  if(products){
       totalPrice =totalProducts(products)
    }
  
  useEffect(() => {
  
    if(product.length>0){
      setproducts(JSON.parse(localStorage.getItem("cartItems")))
    }
    if(product.length===0){
      setproducts([])
    }
    dispatch(setTotalPrice(totalPrice))
   
  }, [product,dispatch,totalPrice])

  return (
    <>  
     {products.length===0?<>
<div className="h-screen flex justify-center items-center flex-col w-full">
<h1 className=" text-4xl  ">your cart is empty</h1>
     <Link to={"/"}> <button className="w-36 rounded-xl h-10 bg-blue-800 text-white text-2xl mx-auto block  mt-5">Shop</button></Link>
</div>
     </>:<>
     <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
     <div className="w-3/6 m-auto h-screen">
     <div className=" mt-32">
     <div >
        <div className="flex justify-center items-center flex-col ">  
          <ul className="w-full p-4 m-auto">
            {products.map((product) => (
              <li key={product.product} className="flex py-6 ">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mx-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-24 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="ml-4">{(product.price)*(product.qty)}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.qty}</p>

                    <div className="flex">
                      <button
                      onClick={(e)=>{ handleremoveCartItem(product.product)}}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 ">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p> &#8377;{totalPrice} </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/orders/cart/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
           <Link to={'/'}>
           <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >   
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
           </Link>
          </p>
        </div>
      </div>
     </div>
     </div>
     </>}
    </>
  );
};

export default Cart;
