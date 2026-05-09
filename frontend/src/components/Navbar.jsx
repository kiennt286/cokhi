import React, { useState, useEffect, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

import search from '../assets/search.png'
import menu from '../assets/menu.png'
import back from '../assets/back.png'
import cart from '../assets/cart.png'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { cartItems } = useContext(ShopContext)

  const PHONE = '0966148632'

  const navItems = [
    { label: 'SẢN PHẨM', to: '/collection' },
    { label: 'KIẾN THỨC CNC', to: '/kien-thuc' },
    { label: 'GIỚI THIỆU', to: '/about' },
    { label: 'LIÊN HỆ', to: '/contact' },
  ]

  const totalItems = Object.values(cartItems).reduce((total, product) => {
    return total + Object.values(product).reduce((sum, qty) => sum + qty, 0)
  }, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`
          border-b border-gray-300
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${
            scrolled
              ? 'bg-white/90 backdrop-blur-md shadow-md'
              : 'bg-white'
          }
        `}
      >
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">

          <div className="flex items-center justify-between h-[68px] lg:h-[78px]">

            {/* LEFT */}
            <Link to="/" className="flex items-center gap-2">

              <div className="flex flex-col leading-none">

                <span className="text-2xl lg:text-3xl font-black tracking-wide text-[#ED3524]">
                  CNC
                </span>

                <span className="text-[9px] lg:text-[11px] text-gray-500 font-medium tracking-[2px]">
                  MECHANICAL TOOLS
                </span>

              </div>

            </Link>

            {/* CENTER MENU */}
            <ul className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-gray-800">

              {navItems.map((item) => (
                <li key={item.to}>

                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `
                      relative pb-1 transition-all
                      hover:text-[#ED3524]
                      ${isActive ? 'text-[#ED3524]' : ''}
                    `
                    }
                  >
                    {item.label}
                  </NavLink>

                </li>
              ))}

            </ul>

            {/* RIGHT */}
            <div className="flex items-center gap-3 lg:gap-5">

              {/* SEARCH BOX DESKTOP */}
              <div
                className="
                  hidden md:flex
                  items-center
                  bg-[#f5f5f5]
                  border border-gray-300
                  rounded-full
                  px-4
                  h-[44px]
                  w-[280px]
                  transition-all
                  focus-within:border-[#ED3524]
                  focus-within:bg-white
                "
              >

                <img
                  src={search}
                  alt="Tìm kiếm"
                  className="w-4 opacity-60"
                />

                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  className="
                    bg-transparent
                    outline-none
                    px-3
                    text-sm
                    w-full
                  "
                />

              </div>

              {/* MOBILE SEARCH */}
              <button
                className="
                  md:hidden
                  w-[38px]
                  h-[38px]
                  rounded-full
                  border border-gray-300
                  flex items-center justify-center
                  bg-white
                "
              >

                <img
                  src={search}
                  alt="Search"
                  className="w-4 opacity-70"
                />

              </button>

              {/* CART */}
              <Link
                to="/cart"
                className="
                  relative
                  flex items-center justify-center
                  w-[38px] h-[38px]
                  lg:w-[42px] lg:h-[42px]
                  border border-gray-300
                  rounded-full
                  hover:border-[#ED3524]
                  transition-all
                  bg-white
                "
              >

                <img
                  src={cart}
                  alt="Giỏ hàng"
                  className="w-4 lg:w-5"
                />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute -top-1 -right-1
                      bg-[#ED3524]
                      text-white
                      text-[10px]
                      w-5 h-5
                      rounded-full
                      flex items-center justify-center
                    "
                  >
                    {totalItems}
                  </span>
                )}

              </Link>

              {/* HOTLINE */}
              <a
                href={`tel:${PHONE}`}
                className="
                  hidden xl:flex
                  flex-col
                  leading-none
                "
              >

                <span className="text-[11px] text-gray-500 font-medium">
                  Hotline hỗ trợ
                </span>

                <span className="font-montserrat text-[#ED3524] font-bold text-[16px] mt-1">
                  {PHONE}
                </span>

              </a>

              {/* MOBILE MENU */}
              <button
                onClick={() => setVisible(true)}
                className="
                  lg:hidden
                  w-[38px]
                  h-[38px]
                  rounded-full
                  border border-gray-300
                  flex items-center justify-center
                  bg-white
                "
              >

                <img
                  src={menu}
                  alt="Menu"
                  className="w-4"
                />

              </button>

            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={`
            fixed top-0 right-0 bottom-0
            bg-white
            z-50
            transition-all duration-300
            overflow-hidden
            shadow-2xl
            ${visible ? 'w-[280px]' : 'w-0'}
          `}
        >

          <div className="flex flex-col h-full">

            {/* TOP */}
            <div className="flex items-center justify-between px-5 h-[68px] border-b">

              <span className="font-bold text-lg">
                MENU
              </span>

              <button onClick={() => setVisible(false)}>

                <img
                  src={back}
                  alt="Đóng menu"
                  className="w-4"
                />

              </button>

            </div>

            {/* SEARCH */}
            <div className="px-5 py-4 border-b">

              <div
                className="
                  flex items-center
                  bg-gray-100
                  border border-gray-200
                  rounded-full
                  px-4
                  h-[44px]
                "
              >

                <img
                  src={search}
                  alt=""
                  className="w-4 opacity-60"
                />

                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  className="
                    bg-transparent
                    outline-none
                    ml-3
                    w-full
                    text-sm
                  "
                />

              </div>

            </div>

            {/* HOTLINE */}
            <a
              href={`tel:${PHONE}`}
              className="
                px-5 py-4
                border-b
                flex flex-col
              "
            >

              <span className="text-xs text-gray-500 mb-1">
                Hotline hỗ trợ
              </span>

              <span className="text-[#ED3524] font-bold text-lg">
                {PHONE}
              </span>

            </a>

            {/* MENU ITEMS */}
            <div className="flex flex-col">

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setVisible(false)}
                  className="
                    px-5 py-4
                    border-b
                    font-medium
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  {item.label}
                </NavLink>
              ))}

            </div>

            {/* CTA */}
            <div className="mt-auto p-5">

              <a
                href={`https://zalo.me/${PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center justify-center
                  bg-[#ED3524]
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-md
                "
              >
                Nhận tư vấn ngay
              </a>

            </div>

          </div>

        </div>
      </header>

      {/* SPACER */}
      <div className="h-[68px] lg:h-[78px]"></div>
    </>
  )
}

export default Navbar