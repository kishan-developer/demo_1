import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Product from '../Pages/ProductPage/Product';
// import Login from '../Pages/Login/Login';
import AppLayout from './AppLayout';
import Footer from '../Components/Footer/Footer'
import Cart from '../Pages/Cart/Cart';
import Fav from '../Pages/Favarate/Fav';
import SignUp from '../Pages/Login/SignUp';
import Login from '../Pages/Login/UserLogin/Login';
import Admin from '../Pages/Admin/Admin';
import ProductReview from '../Pages/ProductReview/ProductReview';
import Mobile from '../Pages/Mobile/Mobile';

import Private from '../Utils/ProtectedRoute/Private';
import DropDown from '../Components/ChildComponents/DropDown';
import CheckoutAddress from '../Pages/Cart/Checkout/CheckoutAddress';
import Order from '../Pages/Order/Order';
import SingleOrderData from '../Pages/Order/SingleOrderData.jsx';
import MyAccount from '../Pages/Admin/MyAccount.jsx';
import Payment from '../Pages/Order/Payment.jsx';
import OrderPlace from '../Pages/Order/OrderPlace';

function AllRoutes() {
    // const [auth , setAuth] = useState(false);
    const {id} = useParams();
    const { orderId } = useParams();

    return (

        <BrowserRouter>
            <AppLayout />
            <Routes>
                <Route path='/offer' element={<h1>Offer page</h1>} />
                <Route path='/fanbook' element={<h1>Fanbook</h1>} />
                <Route path='/downloadapp' element={<h1>Download App</h1>} />
                <Route path='/membership' element={<h1>Membership</h1>} />
                <Route path='/contact' element={<h1>Contact Us</h1>} />
                <Route element={<Private/>}>
                    <Route path='/trackOrder' element={<h1>Track Orders</h1>} />
                </Route>
                
                <Route path="/" element={<Home />} />
{/*                 <Route path="/men" element={<Product />} /> */}
{/*                 <Route path="/women" element={<Product />} /> */}
                <Route path='/mobilecover' element={<Mobile/>} />

                <Route path='/review/:id' element={<ProductReview/>} />

                <Route element={<Private/>} >
                    {/* <Route path="/admin" element={<Admin />} /> */}
                    <Route path='/fav' element={<Fav />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/checkoutpage" element={<CheckoutAddress />} />
                    <Route path="/order" element={<Order/>} />
                    <Route path="/orderplace" element={<OrderPlace />} />
                    <Route path="/order/:orderId" element={<SingleOrderData />} />

                    <Route path="/myaccount" element={<MyAccount/>} />
                    <Route path='/payment' element={<Payment/>} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                
                
                
            </Routes>
        </BrowserRouter>
        
    )
}

export default AllRoutes;
