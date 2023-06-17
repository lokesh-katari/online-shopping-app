import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, ChevronRight, ShoppingCart } from "lucide-react";
import { setShippingAddress } from "../../features/Cart/cart";
import { useDispatch } from "react-redux";
import { createOrder } from "../../features/Orders/orderSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setCartItems } from "../../features/Cart/cart";

const steps = ["Personal Information", "Payment Method", "Confirmation"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let products = useSelector((state) => state.cart.cartItems);
  let TotalPrice = useSelector((state) => state.cart.totalPrice);
  let ShippingInfoFromStorage = useSelector(
    (state) => state.cart.shippingAddress
  );
  let { name, Email, phone } = useSelector((state) => state.userSlice.userData);
  const paymentInfo = useSelector((state) => state.orders.paymentInfo);
  const [personalInfo, setpersonalInfo] = useState({ name, Email });
  const [shippingAddress, setshippingAddress] = useState({
    address: ShippingInfoFromStorage.address,
    pincode: ShippingInfoFromStorage.pincode,
    doorno: ShippingInfoFromStorage.doorno,
  });
  console.log(shippingAddress);
  console.log(name, Email);

  useEffect(() => {
    // setshippingInfo(JSON.parse(localStorage.getItem("shippingAddress")))
  }, [setpersonalInfo]);
  const handleNext = () => {
    dispatch(setShippingAddress(shippingAddress));
    console.log("orderPlaced");
    dispatch(
      createOrder({
        shippingInfo: shippingAddress,
        phonenumber: phone,
        orderItems: products,
        paymentInfo: paymentInfo,
        itemsPrice: TotalPrice,
        shippingPrice: 0,
        totalPrice: TotalPrice,
      })
    );
    toast("Order Placed");
    dispatch(setCartItems());
    // navigate('/')
  };
  return (
    <div className="mx-auto w-full max-w-7xl bg-slate-100 pt-20 h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="mx-auto my-4 max-w-2xl md:my-6">
        {/* breadcrumb */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to={"/orders/cart"}
                className="ml-1 inline-flex text-sm font-medium text-gray-900 hover:underline md:ml-2"
              >
                <Home size={16} className="mr-2 text-gray-900" />
                Cart
              </Link>
            </li>
            {steps.map((step) => (
              <li key={step}>
                <div className="flex items-center">
                  <ChevronRight size={16} className="mr-2 text-gray-600" />
                  <Link className="ml-1 text-sm font-medium text-gray-900 hover:underline md:ml-2">
                    {step}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        {/* Form */}
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex items-center rounded-lg py-2">
            <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
              <ShoppingCart size={20} />
            </div>
            <div className="flex flex-1">
              <p className="text-sm font-medium">
                You have <strong>{products.length}</strong> items in cart. Sub
                total is <strong>₹ {TotalPrice}</strong>
              </p>
            </div>
            <Link
              to={"/orders/cart"}
              className="ml-1 inline-flex text-sm font-medium text-gray-900 hover:underline md:ml-2"
            >
              <Home size={16} className="mr-2 text-gray-900" />
              Cart
            </Link>
          </div>
          <p className="text-sm font-bold text-gray-900">Personal Info</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your first name"
                id="firstName"
                onChange={(e) =>
                  setpersonalInfo({ ...personalInfo, name: e.target.value })
                }
                value={personalInfo.name}
              ></input>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setpersonalInfo({ ...personalInfo, Email: e.target.value })
                  }
                  value={personalInfo.Email}
                ></input>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-900">Shipping Info</p>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your address"
                  onChange={(e) =>
                    setshippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  value={shippingAddress.address}
                ></input>
              </div>
            </div>
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                Pincode
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your Pin code"
                id="firstName"
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    pincode: e.target.value,
                  })
                }
                value={shippingAddress.pincode}
              ></input>
            </div>{" "}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                Door No:
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your Door No:"
                id="firstName"
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    doorno: e.target.value,
                  })
                }
                value={shippingAddress.doorno}
              ></input>
            </div>
            <div>
              <p>Payment Type : Cash On Delivery</p>
            </div>
            <div className="col-span-2 grid">
              <button
                type="button"
                onClick={handleNext}
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
