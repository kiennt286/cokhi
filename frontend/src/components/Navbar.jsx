import React, { useState, useEffect, useContext} from 'react'
import { NavLink, Link } from 'react-router-dom'
import search from '../assets/search.png' 
import cart from '../assets/cart.png' 
import menu from '../assets/menu.png' 
import back from '../assets/back.png' 
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useContext(ShopContext);

  const PHONE = "0966148632"; // 👉 sửa số tại đây

  const navItems = [
    { label: 'TRANG CHỦ', to: '/' },
    { label: 'SẢN PHẨM', to: '/collection' },
    { label: 'GÓC KIẾN THỨC', to: '/kien-thuc' },
    { label: 'LIÊN HỆ', to: '/contact' },
  ];

  const totalItems = Object.values(cartItems).reduce((total, product) => {
    return total + Object.values(product).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/30"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
          <div className="flex items-center justify-between py-5 font-medium">
            
            {/* LOGO */}
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p className="font-montserrat text-4xl font-bold text-[#ED3524]">
                CNC
              </p> 
            </NavLink>

            {/* MENU */}
            <ul className="hidden sm:flex gap-5 text-sm text-gray-800">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="hover:text-[#ED3524]"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

              {/* SEARCH */}
              <img src={search} alt="" className="w-5 cursor-pointer" />

              {/* CART */}
              <Link to="/cart" className="relative flex items-center gap-2">
                <img src={cart} alt="" className="w-5 min-w-5" />
                <span className="text-sm font-montserrat hidden sm:block">
                  Giỏ hàng
                </span>

                {totalItems > 0 && (
                  <p className="absolute right-[-5px] bottom-[-5px] w-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                    {totalItems}
                  </p>
                )}
              </Link>

              {/* MOBILE MENU */}
              <img
                onClick={() => setVisible(true)}
                src={menu}
                alt=""
                className="w-5 cursor-pointer sm:hidden"
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR MOBILE */}
        <div
          className={`fixed top-0 right-0 bottom-0 overflow-y-auto bg-white transition-all h-screen z-50 ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 min-h-screen">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img src={back} alt="" className="h-4" />
              <p>Back</p>
            </div>

            {/* 👉 Hotline trong mobile */}
            <a
              href={`tel:${PHONE}`}
              className="py-3 pl-6 border-b text-[#ED3524] font-semibold"
            >
              ☎ Gọi: {PHONE}
            </a>

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className="py-3 pl-6 border-b"
                to={item.to}
                onClick={() => setVisible(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer tránh bị đè */}
      <div className="pt-20"></div>
    </>
  )
}

export default Navbar