import React from 'react'

const Hero = () => {
  return (
    <section className="w-full">
      <img
        src="/herobg.png" // 👉 đổi thành ảnh bạn muốn
        alt="Hero banner"
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
      />
    </section>
  )
}

export default Hero