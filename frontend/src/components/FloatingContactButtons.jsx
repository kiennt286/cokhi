import React from 'react';

const PHONE_NUMBER = '0966148632';
const ZALO_NUMBER = '84966148632';

const FloatingContactButtons = () => {
  const telHref = `tel:${PHONE_NUMBER}`;
  const zaloHref = `https://zalo.me/${ZALO_NUMBER}`;

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3">

      {/* Zalo */}
      <a
        href={zaloHref}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg border border-gray-200 hover:scale-105 transition"
        aria-label="Chat Zalo"
      >
        <img
          src="/icon_zalo.png"
          alt="Zalo"
          className="w-7 h-7 object-contain"
        />
      </a>

    

    </div>
  );
};

export default FloatingContactButtons;