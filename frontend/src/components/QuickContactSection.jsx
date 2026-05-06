import React from 'react';
import PhoneIcon from "../assets/phone-call.svg?react";
import LocationIcon from "../assets/marker.svg?react";
import ClockIcon from "../assets/clock.svg?react";

const QuickContactSection = () => {
  return (
    <section id="lien-he" className="w-full">
      <div className="border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* Số điện thoại */}
          <a 
            href="tel:0966148632" 
            className="p-6 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center mb-1">
              <PhoneIcon className="w-3.5 h-3.5 text-[#ED3524] mr-2" />
              <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524]">
                SỐ ĐIỆN THOẠI
              </p>
            </div>
            <p className="font-montserrat text-lg font-semibold text-gray-900 ml-6">
              0966148632
            </p>
          </a>

          {/* Địa chỉ */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Hà+Nội"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center mb-1">
              <LocationIcon className="w-3.5 h-3.5 text-[#ED3524] mr-2" />
              <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524]">ĐỊA CHỈ</p>
            </div>
            <p className="font-montserrat text-lg font-semibold text-gray-900 ml-6">THÀNH PHỐ HÀ NỘI</p>
          </a>

          {/* Thời gian làm việc */}
          <div className="p-6 hover:bg-gray-50 transition">
            <div className="flex items-center mb-1">
              <ClockIcon className="w-3.5 h-3.5 text-[#ED3524] mr-2" />
              <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524]">THỜI GIAN LÀM VIỆC</p>
            </div>
            <p className="font-montserrat text-lg font-semibold text-gray-900 ml-6">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuickContactSection;