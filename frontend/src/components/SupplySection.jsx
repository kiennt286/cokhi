import React from 'react';
import { collectionGroups } from '../assets/assets';

const SupplySection = () => {
  const items = [
    {
      title: 'Dao cụ cắt gọt',
      desc: 'Dao phay, dao tiện, mảnh chip cho nhiều nhóm vật liệu và chế độ cắt.',
      img: collectionGroups[3],
    },
    {
      title: 'Dụng cụ gia công lỗ',
      desc: 'Khoan, taro, doa cùng giải pháp xử lý lỗ chính xác và ổn định.',
      img: collectionGroups[9],
    },
    {
      title: 'Phụ trợ và đo kiểm',
      desc: 'Dụng cụ đo, phụ kiện CNC và vật tư phục vụ sản xuất liên tục.',
      img: collectionGroups[15],
    },
  ];

  return (
    <section className="py-16">
      <div className="">
        <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2">NĂNG LỰC</p>
        <h2 className="font-montserrat font-extrabold text-3xl mb-7">Danh Mục Cung Ứng Chính</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-montserrat">
          {items.map((item) => (
            <div key={item.title} className="border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all">
              <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
              <div className="p-6 bg-[#f8fafc]">
                <p className="font-montserrat font-bold text-lg mb-3">{item.title}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplySection;
