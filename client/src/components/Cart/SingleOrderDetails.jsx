import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';

const style = {
  position: "absolute",
  top: "50%",
margin:"auto",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height:"90vh",
  borderRadius: "16px",
};


 

const SingleOrderDetails = ({orderDetails,orderAt,totalPrice,id}) => {

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
 
  
  return (
    <div>
      <button className="border-blue-400 border-solid rounded-lg border-2 p-1" onClick={handleOpen}>View</button>
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={open}
         onClose={handleClose}
         closeAfterTransition
         slots={{ backdrop: Backdrop }}
         slotProps={{
           backdrop: {
             timeout: 500,
           },
         }}
      >
        <Box sx={style}>
      
      <h2 className="text-3xl font-bold">Order Details</h2>
      <div className="mt-3 text-sm">
        Check the status of recent and old orders & discover more products
      </div>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-screen border-r border-gray-300 bg-gray-100 md:max-w-xs h-full">
          <div className="p-8 ">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                
              {[
                ['Order ID',id],
                ['Date', orderAt],
                ['Total Amount', totalPrice],
                // ['Order Status', orderStatus],
              ].map(([key, value]) => (
                <div key={key} className="mb-4">
                  <div className="text-sm font-semibold">{key}</div>
                  <div className="text-sm font-medium text-gray-700">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
              {orderDetails.map((order) => (
                <li
                  key={order.id}
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={order.imageSrc}
                        alt={order.imageSrc}
                      />
                    </div>

                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{order.name}</p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">{order.color}</p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500">x {order.quantity}</p>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">{order.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-8 border-t border-t-gray-200" />
            <div className="space-x-4">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                View Order
              </button>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                View Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

        </Box>
      </Modal>
    </div>
  );
};

export default SingleOrderDetails;
