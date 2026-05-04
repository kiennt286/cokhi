import React from 'react';

const QuickContactSection = () => {
  return (
    <section id="lien-he" className="">
      <div className="border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <a href="tel:0966148632" className="p-6 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition">
            <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524] mb-2">
              SỐ ĐIỆN THOẠI
            </p>
            <p className="font-montserrat text-lg font-semibold text-gray-900">
              0966148632
            </p>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Hà+Nội"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition"
          >
            <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524] mb-2">ĐỊA CHỈ</p>
            <p className="font-montserrat text-lg font-semibold text-gray-900">THÀNH PHỐ HÀ NỘI</p>
          </a>

          <div className="p-6 hover:bg-gray-200 transition">
            <p className="font-montserrat text-xs tracking-[0.18em] text-[#ED3524] mb-2">THỜI GIAN LÀM VIỆC</p>
            <p className="font-montserrat text-lg font-semibold text-gray-900">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactSection;