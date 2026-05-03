import React from 'react';

const QuickContactSection = () => {
  return (
    <section id="lien-he" className="py-16 bg-[#0f172a] text-white">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-montserrat text-sm tracking-[0.2em] text-orange-300 mb-2">CALL TO ACTION</p>
          <h2 className="font-montserrat font-extrabold text-3xl mb-4">Liên Hệ Để Nhận Tư Vấn Kỹ Thuật</h2>
          <p className="font-montserrat text-slate-300">
            Gửi thông tin vật liệu và công đoạn gia công, đội ngũ kỹ thuật sẽ đề xuất phương án dao
            cụ phù hợp để bạn triển khai nhanh.
          </p>
        </div>

        <div className="border border-slate-600 bg-white/5 p-6 font-montserrat">
          <p className="text-slate-300 mb-2">Ưu tiên liên hệ nhanh qua</p>
          <p className="text-sm text-slate-400 mb-5">
            Zalo hoặc gọi điện (nút nổi bên phải màn hình). Bạn có thể bấm “Xem danh mục” để tham khảo trước.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/collection"
              className="inline-block border border-slate-300 px-5 py-3 font-semibold hover:bg-white hover:text-[#0f172a] transition-colors"
            >
              Xem danh mục
            </a>
            <a
              href="#lien-he"
              className="inline-block bg-[#ED3524] px-5 py-3 font-semibold hover:bg-[#cf2f20] transition-colors"
            >
              Nhận tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactSection;
