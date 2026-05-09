import React from 'react'
import anhnen from '../assets/anhhero.jpg'

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <img
        src={anhnen}
        alt="Xưởng cơ khí CNC hiện đại"
        className="
          w-full
          h-[300px]
          sm:h-[400px]
          lg:h-[550px]
          object-cover
          object-center
        "
      />
    </section>
  )
}

export default Hero