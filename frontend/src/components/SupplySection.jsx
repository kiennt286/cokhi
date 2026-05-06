import React from 'react';
import { Link } from 'react-router-dom';
import daocat from '../assets/chiptien.png';
import khoan from '../assets/khoantao.jpg';
import dokiem from '../assets/dungcudokiem.jpg';

const SupplySection = () => {
  const items = [
    {
      title: 'Dao cụ cắt gọt',
      desc: 'Dao phay, dao tiện, mảnh chip cho nhiều nhóm vật liệu và chế độ cắt.',
      idx: '01 / Cắt gọt',
      img: daocat,
    },
    {
      title: 'Dụng cụ gia công lỗ',
      desc: 'Khoan, taro, doa cùng giải pháp xử lý lỗ chính xác và ổn định.',
      idx: '02 / Gia công lỗ',
      img: khoan,
    },
    {
      title: 'Phụ trợ và đo kiểm',
      desc: 'Dụng cụ đo, phụ kiện CNC và vật tư phục vụ sản xuất liên tục.',
      idx: '03 / Phụ trợ & đo kiểm',
      img: dokiem,
    },
  ];

  return (
    <section className="py-12">
      {/* Header */}
      <p
        className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2"
      >
        DANH MỤC SẢN PHẨM
      </p>
      <div className="flex items-flex-end justify-between gap-4">
        <h2
          className="font-montserrat font-extrabold text-2xl"
        >
          Chúng Tôi Cung Ứng Gì
        </h2>
        <Link
          to="/collection"
          className="font-montserrat text-sm text-[#ED3524] hover:underline self-end"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 overflow-hidden group bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-55 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <p className="font-montserrat mb-1 text-[10px] uppercase tracking-[0.15em] text-[#ED3524]">
                {item.idx}
              </p>

              <h3 className="font-montserrat mb-2 text-[15px] font-bold group-hover:text-[#ED3524] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-gray-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupplySection;