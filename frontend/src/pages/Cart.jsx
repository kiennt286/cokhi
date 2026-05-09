import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Seo from '../components/Seo';

const Cart = () => {
  const {
    products,
    formatPrice,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    getCartSubtotal,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          tempData.push({ _id: productId, size, quantity: qty });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const subtotal = getCartSubtotal();

  if (cartData.length === 0) {
    return (
      <div className="pt-14 pb-20 text-center">
        <Seo
          title="Giỏ hàng"
          description="Giỏ hàng sản phẩm tại CNC Bắc Ninh."
          path="/cart"
          noIndex={true}
        />
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6">Hãy thêm sản phẩm để tiếp tục mua sắm.</p>
        <Link
          to="/collection"
          className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className=" pt-8 pb-24">
      <Seo
        title="Giỏ hàng"
        description="Giỏ hàng sản phẩm tại CNC Bắc Ninh."
        path="/cart"
        noIndex={true}
      />
      <h1 className="text-2xl font-semibold mb-6">Giỏ hàng</h1>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;
          const lineTotal = productData.price * item.quantity;

          return (
            <div
              key={`${item._id}-${item.size}-${index}`}
              className="py-4 border-b text-gray-700 grid grid-cols-1 sm:grid-cols-[4fr_2fr_2fr_1fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-sm sm:text-base font-medium">{productData.name}</p>
                  {item.size !== 'default' && (
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Đơn giá: {formatPrice(productData.price)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  aria-label="Giảm số lượng"
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                  onClick={() => updateCartQuantity(item._id, item.size, item.quantity - 1)}
                >
                  −
                </button>
                <input
                  className="w-12 text-center border rounded py-1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartQuantity(item._id, item.size, e.target.value)
                  }
                />
                <button
                  aria-label="Tăng số lượng"
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                  onClick={() => updateCartQuantity(item._id, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-sm font-medium">
                {formatPrice(lineTotal)}
              </div>

              <div className="text-right">
                <button
                  className="text-red-600 hover:text-red-700 text-sm"
                  onClick={() => removeFromCart(item._id, item.size)}
                >
                  Xóa
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between py-2 border-b">
            <span>Tạm tính</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Vận chuyển</span>
            <span className="font-medium">Miễn phí</span>
          </div>
          <div className="flex justify-between py-2 text-base">
            <span className="font-semibold">Tổng</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <Link
            to="/collection"
            className="px-5 py-3 border rounded hover:bg-gray-100 text-sm"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            to="/place-order"
            className="px-5 py-3 bg-black text-white hover:bg-gray-800 text-sm"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
