import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});

  const fetchCart = useCallback(async () => {
    try {
      const userdata = localStorage.getItem("auth");
      if (userdata) {
        const user = JSON.parse(userdata);
        const payload = user.user;
        console.log("payload", payload);
        const { data } = await axios.post("/api/getCart", { payload });
        console.log("data", data);
        setCart(data.products);
        toast.success("check your cart");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [setCart]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const getProduct = async (id) => {
    try {
      const { data } = await axios.post(`/api/product-cart/${id}`);
      return data.product;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = {};
      for (const item of cart) {
        const product = await getProduct(item.id);
        productDetails[item.id] = product;
      }
      setProducts(productDetails);
    };
    if (cart.length) {
      fetchProducts();
    }
  }, [cart]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        const product = products[item.id];
        if (product) {
          total += product.price * (item.quantity || 1);
        }
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (pid) => {
    try {
      const userdata = localStorage.getItem("auth");
      if (userdata) {
        const user = JSON.parse(userdata);
        const userEmail = user.user.email;
        await axios.post("/api/removeFromCart", { productId: pid, userEmail });
      }
      
      // Remove the item from the local state
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
  
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
      toast.error("Error removing item from cart");
    }
  };
  

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2 p-3 " key={p._id}>
                <div className="col-md-4">
                  <Link to={`/product/${products[p.id]?.slug}`}>
                    <img
                      src={`/api/v1/product/product-photo/${p.id}`}
                      height={"100px"}
                      width={"100px"}
                      className="card-img-top"
                      alt={products[p.id]?.name}
                    />
                  </Link>
                </div>
                <div className="col-md-8">
                  <h5>
                    <Link to={`/product/${products[p.id]?.slug}`}>{products[p.id]?.name}</Link>
                  </h5>
                  <p>{products[p.id]?.description?.substring(0, 30)}</p>
                  <p>Quantity : {p.quantity}</p>
                  <h5>Price: ${products[p.id]?.price}</h5>
                  <button
                    className="btn btn-secondary btn-delete"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
