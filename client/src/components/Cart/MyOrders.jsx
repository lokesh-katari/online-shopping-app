import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { myOrders } from '../../features/Orders/orderSlice'
const MyOrders = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.orders.loading);
 const handleClick=()=>{
    console.log("hii");
    dispatch(myOrders());
 }

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
   <button className='w-screen h-screen justify-center m-auto ' onClick={handleClick}>click</button>
      )
      
      
      }
   </>
  )
}

export default MyOrders