import React, { useEffect, useState } from 'react';
import { useThemeContextValue } from '../../Utils/context/ThemeContext';
import PaymentPage from './PaymentPage';
import { Link, useNavigate } from 'react-router-dom';
import PaymentProductCart from './PaymentProductCart';
import { TbFileArrowRight } from "react-icons/tb";
import axios from 'axios';
import PaymentMethod from './PaymentMethod';

const Payment = () => {

    const { productID, orderData, setOrderData, getOrderItem, userName, OrderCartItem, setOrderCartItem, cartItems, clearCartPage, getCartItem, formData, setFormData, quantity, setQuantity, size, setSize } = useThemeContextValue();
    const [totalValue, setTotalValue] = useState([]);
    const [discount, setdiscount] = useState(0);
    const [payAmount, setPayAmount] = useState(0);


    const navigate = useNavigate();
    // useEffect(() => {
    //     // getOrderItem();
    //     // setOrderCartItem(cartItems);
    //     console.log("OrderCartItem", OrderCartItem);
    // }, [])
    const useData = localStorage.getItem("Order User Address");
    const useDetails = JSON.parse(useData);
    // if(useDetails){
    //     setFormData(useDetails);
    // }
    // console.log("user Details localStorage ", useDetails);

    // console.log("User Details formData state", formData);

    // console.log(size);
    // console.log(quantity)



    // Assuming orderData is your original array
    useEffect(() => {
        // console.log("OrderCartItem", OrderCartItem);
        // Calculate total sum
        // const totalSum = orderData.reduce((acc, curr) => acc + curr.order.totalPrice, 0);
        const totalSum = OrderCartItem?.totalPrice;
        // Update state with the total sum
        setTotalValue(totalSum);
        if (totalSum > 0) {
            setdiscount(totalValue * 0.25);
            // const twentyFivePercent = totalValue * 0.25;
            // console.log("25% of 1465 is:", twentyFivePercent);
            setPayAmount(totalValue - discount);
        }
        setPayAmount(totalValue - discount);

    }, [orderData]); // Make sure to include all dependencies that affect the orderData array

    // Now totalValue state will contain the sum of all total prices
    // console.log("Total cart amount", totalValue);

    //handleOrgerPayment 
    const handleOrgerPayment = () => {
        // console.log("handlepauymet : formData.street ", formData.street)
        if (totalValue === 0) {
            alert("Please Add some product")
        } else {
            handleSubmit();
            clearCartPage()
            getCartItem()
            alert(`User paid successfully: ${totalValue}`);
            navigate('/orderplace')
        }
    }


////////////////////////////////////////////////////////////////////////////////////////////
    // buy now api calling 
    const handleSubmit = async() => {
        // console.log("buy api calling")
        // event.preventDefault();
        const pID = localStorage.getItem("payment_page_product_id")
        // console.log(pID);
        const qut = localStorage.getItem("PaymentPage_Product_quantity");
        const token = localStorage.getItem("token"); // Replace with your JWT token
        // console.log("00", token);

        const url = "https://academics.newtonschool.co/api/v1/ecommerce/order";

        const myHeaders = new Headers();
        // myHeaders.append("projectId", "rcetbaqftf5m");
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", `Bearer ${token}`);

        myHeaders.append("projectId", "rcetbaqftf5m");
        // console.log("Headers after projectId:", myHeaders);

        myHeaders.append("Content-Type", "application/json");
        // console.log("Headers after Content-Type:", myHeaders);

        myHeaders.append("Authorization", `Bearer ${token}`);
        // console.log("Headers after Authorization:", myHeaders);


        const raw = JSON.stringify({
            "productId": pID,
            "quantity": qut,
            "addressType": "HOME",
            "address": {
                "street": useDetails.street,
                "city": useDetails.city,
                "state": useDetails.state,
                "country": useDetails.country,
                "zipCode": useDetails.zipCode
            }
        });
        // console.log("raw", raw)


        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // console.log("requestoption", requestOptions);

        try {
            const response = await fetch(url,requestOptions);
            const result = await response.json();
            console.log("buy now api", result); // Handle response data as neede
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <div className='xl:flex-row lg:flex-row flex flex-col gap-5 w-full h-fit xl:px-[15rem] lg:px-[4rem] md:px-[4rem] sm:px-[4rem] px-[1rem]'>
            <div className='xl:w-2/3 lg:w-2/3 w-full my-10'>
                <h2 className='font-bold text-md py-5 '>Choose your payment method</h2>
                <div className='xl:h-[400px] lg:h-[300px] h-fit border-[1px] border-black p-3'>
                    <PaymentMethod handleOrgerPayment={handleOrgerPayment}/>
                    {/* <PaymentPage/> */}
                </div>
            </div>

            {/* product page */}
            <div className='px-3 pb-5 pt-1 border-l-[1.5px] border-gray-600 w-[370px] h-fit my-10'>
                <div className='h-[fit] py-1 text-[16px] border-b-[1px] border-black'>
                    <p className='text-[13px] cursor-pointer'>Delivering order to <span className='font-semibold'>{userName}</span></p>
                    <p className='font-semibold flex cursor-pointer'>
                        <span>{useDetails?.street}...</span>
                        <span className='text-blue-300'>
                            <TbFileArrowRight size={30} />
                        </span>
                    </p>
                </div>
                <div>
                    <h2 className='py-3 font-semibold'>You are paying for this items</h2>

                    {
                        OrderCartItem?.items?.map(item => (
                            <div key={item._id}>
                                <PaymentProductCart item={item} OrderCartItem={OrderCartItem} />
                            </div>
                            
                        ))
                    }


                    <div className=' h-[fit] pt-3 pb-2 px-1'>
                        <h2 className='font-bold text-black py-1'>Price Summary</h2>
                        <div className=' h-fit'>
                            <p className='flex justify-between py-1 text-sm'>
                                <span>Total MRP (Incl. of taxes)</span>
                                <span>₹{totalValue}</span>
                            </p>
                            <p className='flex justify-between py-1 text-sm  '>
                                <span>Delivery Fee</span>
                                <span className='text-[#00B852] font-semibold'>FREE</span>
                            </p>
                            {/* <p className='flex justify-between py-1 text-sm '>
                                <span>Discount  On MRP</span>
                                <span>₹{discount}</span>
                            </p> */}
                        </div>
                        <div className='border-t-[1px] border-black px-1 font-semibold '>
                            <p className='flex justify-between py-3 text-md '>
                                <span>Final amount</span>
                                <span>₹{totalValue}</span>
                            </p>

                        </div>
                    </div>

                    {/* logo images  */}
                    <div className='h-[fit] p-[15px] '>
                        <div className=' h-[58px] flex items-center justify-between '>
                            <div className='w-[104px] h-[58px]  flex items-center justify-center flex-col text-[8px]'>
                                <img className='w-[40px]' src="https://images.bewakoof.com/web/cart-badge-trust.svg" alt="logoo" />
                                <p className='text-gray-500'>100% SECURE PAYMENT</p>
                            </div>
                            <div className='w-[143px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='w-[40px]' src="https://images.bewakoof.com/web/cart-easy-return.svg" alt="logoo" />
                                <p className=' w-full text-gray-500'>EASY RETURNS & QUICK REFUNDS</p>
                            </div>
                            <div className='w-[93px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='' src="https://images.bewakoof.com/web/quality-check.svg" alt="logoo" />
                                <p className='text-gray-500'>QUALITY ASSURANCE</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center h-fit text-sm text-gray-400'>
                        <hr /><p>We accept</p><hr />
                    </div>

                    {/* payment methods logos */}
                    <div className='h-[fit] px-[15px] py-2'>
                        <div className=' h-[58px] flex items-center justify-between '>
                            <div className='w-[60px] h-[58px]  flex items-center justify-center flex-col text-[8px]'>
                                <img className='w-[40px]' src="https://images.bewakoof.com/web/google-pay-logo.svg" alt="logoo" />
                                {/* <p className='text-gray-500'>100% SECURE PAYMENT</p> */}
                            </div>
                            <div className='w-[60px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='w-[40px]' src="https://images.bewakoof.com/web/upi-sign.svg" alt="logoo" />
                                {/* <p className=' w-full text-gray-500'>EASY RETURNS & QUICK REFUNDS</p> */}
                            </div>
                            <div className='w-[60px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='' src="https://images.bewakoof.com/web/phone-pay-logo.svg" alt="logoo" />
                                {/* <p className='text-gray-500'>QUALITY ASSURANCE</p> */}
                            </div>
                            <div className='w-[60px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='' src="https://images.bewakoof.com/web/visa-card-logo-9.svg" alt="logoo" />
                                {/* <p className='text-gray-500'>QUALITY ASSURANCE</p> */}
                            </div>
                            <div className='w-[60px] h-[58px]   flex items-center justify-center flex-col text-[8px]'>
                                <img className='' src="https://images.bewakoof.com/web/master-card.svg" alt="logoo" />
                                {/* <p className='text-gray-500'>QUALITY ASSURANCE</p> */}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Payment;
