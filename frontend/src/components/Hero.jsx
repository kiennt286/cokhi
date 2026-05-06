import React from 'react'

const Hero = () => {
  return (
    <section className="w-full">
      <img
        // Link ảnh mới: Cảnh xưởng cơ khí CNC hiện đại với máy móc và kỹ thuật viên
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80"
        alt="Xưởng cơ khí CNC hiện đại"
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
      />
    </section>
  )
}

export default Hero