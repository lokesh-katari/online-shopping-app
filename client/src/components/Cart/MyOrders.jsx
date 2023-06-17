import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { myOrders } from '../../features/Orders/orderSlice'
import SingleOrderDetails from './SingleOrderDetails';
const MyOrders = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.orders.loading);
    const myorders = useSelector((state) => state.orders.myorders);
 const handleClick=()=>{
    console.log("hii");
   
 }
useEffect(() => {
  dispatch(myOrders());
}, [dispatch])

  return (
   <>
    {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vh",
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
  //  <button className='w-screen h-screen justify-center m-auto ' onClick={handleClick}>click</button>
   <>
   <section className="mx-auto w-full max-w-7xl px-4 py-20">
     <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
       <div>
         <h1 className="text-4xl font-semibold">My orders</h1>
       </div>
       {/* <div>
         <button
           type="button"
           className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
         >
           Add new employee
         </button>
       </div> */}
     </div>
     <div className="mt-6 flex flex-col">
       <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
           <div className="overflow-hidden border border-gray-200 md:rounded-lg">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr className="divide-x divide-gray-200">
                   <th
                     scope="col"
                     className="px-4 py-3.5 text-left text-lg font-normal text-gray-500"
                   >
                     <span>Order Id</span>
                   </th>
                   <th
                     scope="col"
                     className="px-12 py-3.5 text-left text-lg font-normal text-gray-500"
                   >
                   Shipping Details
                   </th>

                   <th
                     scope="col"
                     className="px-4 py-3.5 text-left text-lg font-normal text-gray-500"
                   >
                     Status
                   </th>

                   <th
                     scope="col"
                     className="px-4 py-3.5 text-left text-lg font-normal text-gray-500"
                   >
                    Price
                   </th>
                   <th scope="col" className="relative px-4 py-3.5">
                     <span className="sr-only">Edit</span>
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 bg-white">
                 {myorders.map((myorder) => (
                   <tr key={myorder.name} className="divide-x divide-gray-200">
                     <td className="whitespace-nowrap px-4 py-4">
                      
                       <div className="m-1 text-sm text-gray-900">{myorder._id}</div>
                      {/* { console.log(myorder.orderItems)} */}
                       <div className="m-1 text-sm text-gray-500"> <span className="text-sm text-gray-800">Items: </span> {myorder.orderItems.length}</div>
                   
                     </td>
                     <td className="whitespace-nowrap px-12 py-4">
                       <div className="text-sm text-gray-900">{myorder.shippingInfo.address}</div>
                       <div className="text-sm text-gray-900">{myorder.shippingInfo.pincode}</div>
                      
                      {/* { console.log(myorder.orderItems)} */}
                    
                     </td>
                     <td className="whitespace-nowrap px-4 py-4">
                       <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                         {myorder.orderStatus}
                       </span>
                     </td>
                     <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                       {myorder.totalPrice}
                     </td>
                     <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                     <SingleOrderDetails orderDetails={myorder.orderItems} id={myorder._id} orderAt={myorder.orderedAt} totalPrice ={myorder.totalPrice}/>

                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
   
   </section>
 </>
   )
      
      
      }
   </>
  )
}

export default MyOrders