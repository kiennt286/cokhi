import React from "react";
import { collectionGroups } from "../assets/assets";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const items = [
    {
      title: "Dao cụ chất lượng cao",
      desc: "Cung cấp dao phay, dao tiện, mảnh chip cho nhiều vật liệu.",
      img: collectionGroups[0],
    },
    {
      title: "Giải pháp gia công",
      desc: "Tư vấn chọn dao và tối ưu thông số cắt phù hợp.",
      img: collectionGroups[6],
    },
    {
      title: "Hỗ trợ kỹ thuật",
      desc: "Đội ngũ kỹ thuật theo dõi và cải tiến liên tục.",
      img: collectionGroups[12],
    },
    {
      title: "Đo kiểm chính xác",
      desc: "Cung cấp dụng cụ đo và kiểm soát chất lượng.",
      img: collectionGroups[18],
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-3">
            VÌ SAO CHỌN CHÚNG TÔI
          </p>

          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold mb-4">
            CNC BẮC NINH
          </h2>

          <p className="font-montserrat text-sm text-gray-600 leading-relaxed mb-4">
            CNC BẮC NINH là đơn vị chuyên cung cấp dao cụ cơ khí chính xác và
            giải pháp gia công CNC cho doanh nghiệp sản xuất. Với kinh nghiệm thực tế
            trong nhiều lĩnh vực như khuôn mẫu, cơ khí chính xác và sản xuất công nghiệp,
            chúng tôi luôn hướng đến việc tối ưu hiệu suất và giảm chi phí cho khách hàng.
          </p>

          <p className="font-montserrat text-sm text-gray-600 leading-relaxed mb-6">
            Chúng tôi không chỉ bán sản phẩm mà còn đồng hành cùng khách hàng trong việc
            lựa chọn dao cụ phù hợp, tối ưu thông số cắt và cải tiến quy trình sản xuất,
            giúp nâng cao chất lượng và độ ổn định trong gia công.
          </p>

          {/* CTA */}
          <Link
            to="/gioi-thieu"
            className="font-montserrat text-sm inline-flex items-center gap-2 text-[#ED3524] group"
          >
            Đọc thêm
            <span className="transform group-hover:translate-x-1 transition">
              →
            </span>
          </Link>

          <div className="w-18 h-[1px] bg-[#ED3524]"></div>
        </div>

        {/* RIGHT ITEMS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative p-6 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300"
            >
              {/* NUMBER */}
              <div className="absolute top-4 right-4 text-gray-100 text-4xl font-extrabold group-hover:text-[#ED3524]/20 transition">
                {`0${i + 1}`}
              </div>

              {/* IMAGE */}
              <div className="w-16 h-16 mb-4 rounded-lg overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* TEXT */}
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#ED3524] transition">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* ACCENT LINE */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ED3524] group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;