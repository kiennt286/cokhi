import React from 'react';

const PHONE_NUMBER = '09xxxxxxxx';
const ZALO_NUMBER = '09xxxxxxxx';

const FloatingContactButtons = () => {
  const telHref = `tel:${PHONE_NUMBER}`;
  const zaloHref = `https://zalo.me/${ZALO_NUMBER}`;

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3">
      <a
        href={zaloHref}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg px-4 py-3 hover:shadow-xl transition"
      >
        <img
          src="/icon_zalo.png"
          alt="Zalo"
          className="w-9 h-9 object-contain"
        />

        <div className="font-montserrat leading-tight">
          <p className="text-sm font-bold text-gray-900">Chat Zalo</p>
          <p className="text-xs text-gray-500">Tư vấn nhanh</p>
        </div>
      </a>

      <a
        href={telHref}
        className="flex items-center gap-2 bg-[#ED3524] text-white shadow-lg px-4 py-3 hover:bg-[#cf2f20] transition"
        aria-label="Gọi tư vấn"
      >
        <span className="w-9 h-9 grid place-items-center bg-white/15 font-extrabold">
          ☎
        </span>
        <div className="font-montserrat leading-tight">
          <p className="text-sm font-bold">Gọi tư vấn</p>
          <p className="text-xs text-white/80">{PHONE_NUMBER}</p>
        </div>
      </a>
    </div>
  );
};

export default FloatingContactButtons;
