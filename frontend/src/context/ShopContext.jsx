/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState} from "react";
import { products } from "../assets/assets";
import { api } from "../lib/api";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState({});
  const [productList, setProductList] = useState(products);

  const currency = "VNĐ";

  // Hàm định dạng giá
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };


  const addToCart = (productId, size = 'default', quantity = 1) => {
    setCartItems(prev => {
      const prevProduct = prev[productId] || {};
      const prevQty = prevProduct[size] || 0;
      return {
        ...prev,
        [productId]: {
          ...prevProduct,
          [size]: prevQty + quantity,
        },
      };
    });
  };

  const updateCartQuantity = (productId, size = 'default', quantity) => {
    setCartItems(prev => {
      const prevProduct = prev[productId] || {};
      const newQuantity = Math.max(0, Number(quantity) || 0);

      if (newQuantity === 0) {
        const { [size]: _removed, ...restSizes } = prevProduct;
        if (Object.keys(restSizes).length === 0) {
          const { [productId]: _removedProduct, ...restProducts } = prev;
          return restProducts;
        }
        return { ...prev, [productId]: restSizes };
      }

      return {
        ...prev,
        [productId]: {
          ...prevProduct,
          [size]: newQuantity,
        },
      };
    });
  };

  const removeFromCart = (productId, size = 'default') => {
    setCartItems(prev => {
      const prevProduct = prev[productId];
      if (!prevProduct) return prev;
      const { [size]: _removed, ...restSizes } = prevProduct;
      if (Object.keys(restSizes).length === 0) {
        const { [productId]: _removedProduct, ...restProducts } = prev;
        return restProducts;
      }
      return { ...prev, [productId]: restSizes };
    });
  };

  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((total, sizeMap) => {
      return total + Object.values(sizeMap).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const getCartSubtotal = () => {
    let subtotal = 0;
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) subtotal += product.price * qty;
      }
    }
    return subtotal;
  };

  const clearCart = () => setCartItems({});

  React.useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        if (isMounted && Array.isArray(data?.products) && data.products.length > 0) {
          setProductList(data.products);
        }
      } catch {
        // keep fallback static products when API is unavailable
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    products: productList,
    currency,
    formatPrice,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartItemCount,
    getCartSubtotal,
    clearCart,
  };


  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
