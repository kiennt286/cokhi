import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="font-montserrat mt-16 bg-gray-100">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
        
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
          <div>
            <p className="font-montserrat font-extrabold mb-5 text-3xl">DỤNG CỤ CNC</p> 
            <p className='w-full md:w-2/3  text-gray-600'>
              Chúng tôi cung cấp dao cụ cơ khí và giải pháp gia công chính xác, tập trung vào
              tư vấn ứng dụng thực tế, giao hàng đúng tiến độ và hỗ trợ kỹ thuật xuyên suốt.
            </p>
          </div>

          <div>
            <p className='text-xl font-medium mb-5'>THÔNG TIN</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li><Link to="/" className="hover:text-[#ED3524] transition-colors">Trang chủ</Link></li>
              <li><Link to="/kien-thuc" className="hover:text-[#ED3524] transition-colors">Góc kiến thức</Link></li>
              <li><Link to="/collection" className="hover:text-[#ED3524] transition-colors">Sản phẩm</Link></li>
              <li><Link to="/contact" className="hover:text-[#ED3524] transition-colors">Liên hệ</Link></li>
            </ul>    
          </div>

          <div>
            <p className='text-xl font-medium mb-5'>DOANH NGHIỆP</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Email: contact@tencongty.com</li>
              <li>Địa chỉ: (cập nhật địa chỉ)</li>
              <li>Giờ làm việc: 8:00 - 17:30</li>
            </ul>
          </div>
        </div>  

        <div>
          <hr className='border-gray-400'/>
          <p className='py-5 text-sm text-center text-[#ED3524]'>
            Copyright 2026 @ dungcucncbacninh.vn - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
