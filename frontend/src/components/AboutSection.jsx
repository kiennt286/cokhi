import React from "react";

const AboutSection = () => {
  const items = [
    {
      title: "Dao cụ chất lượng cao",
      desc: "Cung cấp dao phay, dao tiện, mảnh chip cho nhiều vật liệu.",
      img: "https://images.unsplash.com/photo-1565043666747-69f6646db940",
    },
    {
      title: "Giải pháp gia công",
      desc: "Tư vấn chọn dao và tối ưu thông số cắt phù hợp.",
      img: "https://images.unsplash.com/photo-1581091870622-2c5c7c57c13b",
    },
    {
      title: "Hỗ trợ kỹ thuật",
      desc: "Đội ngũ kỹ thuật theo dõi và cải tiến liên tục.",
      img: "https://images.unsplash.com/photo-1581093588401-22f4a6f4b1f3",
    },
    {
      title: "Đo kiểm chính xác",
      desc: "Cung cấp dụng cụ đo và kiểm soát chất lượng.",
      img: "https://images.unsplash.com/photo-1581090700227-1e8a9e3c9d1f",
    },
  ];

  return (
    <section className="py-16">
      <div className="">
        <div className="max-w-3xl mb-12">
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-3">VÌ SAO CHỌN CHÚNG TÔI</p>
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl mb-4">
            Về Chúng Tôi
          </h2>
          <p className="font-montserrat text-gray-600 leading-relaxed">
            Chúng tôi cung cấp dao cụ cơ khí và giải pháp gia công CNC, giúp doanh nghiệp
            tối ưu hiệu suất và chất lượng sản xuất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group flex gap-4 p-5 border border-gray-200 bg-white hover:shadow-xl transition"
            >
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="font-montserrat font-bold text-lg mb-1">
                  {item.title}
                </h3>
                <p className="font-montserrat text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;