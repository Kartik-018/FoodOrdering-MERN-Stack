import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { pay } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';


// export default function PaypalButtons({order}) {
//   const onPay=()=>{
//     navigate('/track/' + order._id);
//   }
//   const navigate=useNavigate();
//   return (
//     <div>
//       <button style={{backgroundColor:'blue',color:'white'}} onClick={onPay}>Pay</button>
//     </div>
//   )
  
// }


export default function PaypalButtons({ order }) {
  return (
    <div>
      <Buttons order={order} />
    </div>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();


  const onApprove = async (data, actions) => {
    try {
      
      const orderId = await pay(order._id);
      clearCart();
      toast.success('Payment Saved Successfully', 'Success');
      navigate('/track/' + orderId);
    } catch (error) {
      toast.error('Payment Save Failed', 'Error');
    }
  };

  const onError = err => {
    toast.error('Payment Failed', 'Error');
  };

  return (
    <Button text={"Pay"}
   
      onClick={onApprove}
      onError={onError}
    />
  );
}

