import React, { useCallback, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate,Link } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Fetch cart function memoized with useCallback
    const fetchCart = useCallback(async () => {
        if (auth?.token) {
            try {
                const { data } = await axios.get('/api/get-cart', {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                setCart(data.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        }
    }, [auth?.token, setCart]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Total price calculation
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach(item => { total += item.price });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Remove item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length >= 1
                                ? `You have ${cart.length} items in your cart. ${auth?.token ? " " : "Please login to checkout"}`
                                : ("Your cart is empty")}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {cart?.map((p) => (
                             
                            <div className='row card flex-row mb-2 p-3 ' key={p._id}>
                                <div className='col-md-4'>
                                    <img src={`/api/v1/product/product-photo/${p._id}`}
                                        height={'100px'} width={"100px"}
                                        className='card-img-top' alt={p.name} />
                                </div>
                                <div className='col-md-8'>
                                    <h5><Link to={`/product/${p.slug}`} >{p.name}</Link></h5>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <h5>Price: ${p.price}</h5>
                                    <button className='btn btn-secondary btn-delete' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                           
                           
                            
                        ))}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Add Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: "/cart" })}>Please login to checkout</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
