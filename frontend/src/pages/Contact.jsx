import React, { useState } from 'react';
import BreadcrumbBar from '../components/BreadcrumbBar';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="border-t border-gray-300 pt-10 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="mb-4">
        <BreadcrumbBar items={[{ label: 'Trang chủ', to: '/' }, { label: 'Liên hệ' }]} />
      </div>

      <div className="mb-8">
        <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2">LIÊN HỆ</p>
        <h1 className="font-montserrat font-extrabold text-3xl">Kết nối với chúng tôi</h1>
        <p className="font-montserrat text-gray-600 mt-3 max-w-3xl">
          Bạn cần tư vấn về dao cụ, vật tư cơ khí hoặc gia công CNC? Gửi thông tin, đội ngũ kỹ thuật sẽ phản hồi sớm.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: info + form */}
        <div className="border border-gray-200 bg-white p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 bg-[#f8fafc] p-4">
              <p className="text-xs text-gray-500 font-montserrat">Hotline</p>
              <a className="mt-1 block font-montserrat font-semibold hover:underline" href="tel:+84900000000">
                0900 000 000
              </a>
            </div>
            <div className="border border-gray-200 bg-[#f8fafc] p-4">
              <p className="text-xs text-gray-500 font-montserrat">Email</p>
              <a className="mt-1 block font-montserrat font-semibold hover:underline" href="mailto:contact@cokhi.vn">
                contact@cokhi.vn
              </a>
            </div>
            <div className="border border-gray-200 bg-[#f8fafc] p-4 sm:col-span-2">
              <p className="text-xs text-gray-500 font-montserrat">Địa chỉ</p>
              <p className="mt-1 font-montserrat font-semibold">
                Bắc Ninh, Việt Nam
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-montserrat text-gray-700 mb-1">Họ và tên</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Nhập họ và tên"
                  className="w-full border-2 border-gray-300 px-3 py-3 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-montserrat text-gray-700 mb-1">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Ví dụ: 09xx xxx xxx"
                  className="w-full border-2 border-gray-300 px-3 py-3 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-montserrat text-gray-700 mb-1">Email (tuỳ chọn)</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@email.com"
                className="w-full border-2 border-gray-300 px-3 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-montserrat text-gray-700 mb-1">Nội dung</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Mô tả nhu cầu của bạn (mã dao cụ, vật liệu, số lượng, yêu cầu...)"
                className="w-full border-2 border-gray-300 px-3 py-3 text-sm min-h-[120px]"
                required
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button type="submit" className="px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800">
                Gửi liên hệ
              </button>
              {submitted && (
                <p className="text-sm text-green-700 font-montserrat">
                  Đã gửi thông tin (demo). Bạn có thể gọi hotline để được hỗ trợ nhanh.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Right: map */}
        <div className="border border-gray-200 bg-white overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <p className="font-montserrat font-semibold">Bản đồ</p>
            <p className="font-montserrat text-xs text-gray-500 mt-1">Khu vực: Bắc Ninh</p>
          </div>
          <div className="w-full aspect-[4/3]">
            <iframe
              title="Bản đồ Bắc Ninh"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=105.998%2C21.125%2C106.154%2C21.235&layer=mapnik&marker=21.1861%2C106.0763"
            />
          </div>
          <div className="p-4 text-xs text-gray-500 font-montserrat">
            Nếu bạn muốn hiển thị đúng vị trí công ty, gửi mình địa chỉ cụ thể (hoặc link Google Maps) để mình thay marker.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact