import React from 'react';
import BreadcrumbBar from '../components/BreadcrumbBar';
import Seo from '../components/Seo';

const Contact = () => {
  return (
    <div className="pt-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">

      <Seo
        title="Liên hệ"
        description="Liên hệ CNC Bắc Ninh để được tư vấn dụng cụ CNC, giải pháp gia công và nhận báo giá nhanh."
        path="/contact"
      />

      {/* BREADCRUMB */}
      <div className="mb-4">
        <BreadcrumbBar
          items={[
            { label: 'Trang chủ', to: '/' },
            { label: 'Liên hệ' },
          ]}
        />
      </div>

      {/* HEADING */}
      <div className="mb-8">

        <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-2">
          LIÊN HỆ
        </p>

        <h1 className="font-montserrat font-extrabold text-3xl">
          Kết nối với chúng tôi
        </h1>

        <p className="font-montserrat text-gray-600 mt-3 max-w-3xl">
          Cảm ơn sự quan tâm của bạn đối với website.
          Hãy liên hệ với chúng tôi theo thông tin bên dưới để được hỗ trợ nhanh nhất.
        </p>

      </div>

      {/* CONTENT */}
      <div className="font-montserrat grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">

          <div className="space-y-5">

            {/* ADDRESS */}
            <div className="border border-gray-200 bg-[#f8fafc] p-5">

              <p className="text-xs tracking-[0.15em] text-gray-500 mb-2">
                ĐỊA CHỈ
              </p>

              <p className="text-[15px] leading-7 font-medium text-gray-800">
                Thành phố Hà Nội
              </p>

            </div>

            {/* HOTLINE */}
            <div className="border border-gray-200 bg-[#f8fafc] p-5">

              <p className=" text-xs tracking-[0.15em] text-gray-500 mb-2">
                HOTLINE
              </p>

              <a
                href="tel:0914031345"
                className="
                  font-montserrat
                  text-[#ED3524]
                  hover:underline
                "
              >
                0966 148 632
              </a>

            </div>

            {/* EMAIL */}
            <div className="border border-gray-200 bg-[#f8fafc] p-5">

              <p className="text-xs tracking-[0.15em] text-gray-500 mb-2">
                EMAIL
              </p>

              <a
                href="mailto:dungcucncbacninh@gmail.com"
                className="
                  text-[15px]
                  font-semibold
                  text-gray-800
                  hover:text-[#ED3524]
                "
              >
                dungcucncbacninh@gmail.com
              </a>

            </div>

            {/* WEBSITE */}
            <div className="border border-gray-200 bg-[#f8fafc] p-5">

              <p className="font-montserrat text-xs tracking-[0.15em] text-gray-500 mb-2">
                WEBSITE
              </p>

              <p className="font-montserrattext-[15px] font-semibold text-gray-800">
                dungcucncbacninh.vn
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT MAP */}
        <div className="bg-white border border-gray-200 overflow-hidden shadow-sm min-h-[500px]">

          <iframe
            title="Google Maps"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Hà+Nội,+Việt+Nam&z=13&output=embed"          
          />

        </div>

      </div>
    </div>
  );
};

export default Contact;