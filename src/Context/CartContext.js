import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setCartId(response.data.data._id);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedUserCart(productId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function removeCart(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function removeAll() {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePayment(cartId, shippingAddress) {
    getCart();
    //6588f63c113e3b9c31b9bf10
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://sara-tarek-ramadan.github.io/An-e-commerce-website/`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function addToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserWish(productId) {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function removeToWish(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCart,
        updateQuantity,
        removeAll,
        onlinePayment,
        cartId,
        numOfCartItems,
        setNumOfCartItems,
        addToWish,
        getLoggedUserWish,
        removeToWish,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
