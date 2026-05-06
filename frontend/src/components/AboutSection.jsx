import React from "react";
import { collectionGroups } from "../assets/assets";
import { Link } from "react-router-dom";

const AboutSection = () => {
 const items = [
  {
    title: "Dao cụ chất lượng cao",
    desc: "Cung cấp dao phay, dao tiện, mảnh chip cho nhiều vật liệu.",
    tag: "01 · Sản phẩm",
    img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Giải pháp gia công",
    desc: "Tư vấn chọn dao và tối ưu thông số cắt phù hợp.",
    tag: "02 · Giải pháp",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
  },
 {
  title: "Hỗ trợ kỹ thuật",
  desc: "Đội ngũ kỹ thuật theo dõi và cải tiến liên tục.",
  tag: "03 · Kỹ thuật",
  img: "https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=1600&q=80",
},
{
  title: "Đo kiểm chính xác",
  desc: "Cung cấp dụng cụ đo và kiểm soát chất lượng.",
  tag: "04 · Đo kiểm",
  img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
}
];

  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-18 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="font-montserrat text-sm tracking-[0.2em] text-[#ED3524] mb-3">
            VÌ SAO CHỌN CHÚNG TÔI
          </p>

          <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold mb-6">
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

       
        {/* RIGHT — 2×2 cards (bigger a bit) */}
        <div className="font-montserrat  grid grid-cols-2 gap-3 h-[340px] md:h-[380px]">

          {items.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden group cursor-pointer "
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/herobg.png";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <span className="block mb-1 text-[11px] uppercase tracking-[0.15em] text-[#ED3524]">
                  {item.tag}
                </span>

                <h3 className="text-[13px] font-extrabold leading-snug text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] leading-relaxed text-white/75 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300">
                  {item.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ED3524] group-hover:w-full transition-all duration-300 z-20" />
            </div>
          ))}

        </div>
 
      </div>
    </section>
  );
};

export default AboutSection;