// import React from "react";
// import { Link } from "react-router-dom";
// import watch4 from "../assets/watch4.png";

// const LifestyleCards = () => {
//   const cards = [
//     {
//       title: "Modern Lifestyle",
//       desc: "Đồng hồ không chỉ để xem giờ, mà còn là dấu ấn phong cách của bạn.",
//       image: watch4,
//       link: "/collection",
//     },
//   ];

//   return (
//     <section className="py-16">
//       <div className="grid grid-cols-1 gap-6">
//         {cards.map((card, idx) => (
//           <Link
//             to={card.link}
//             key={idx}
//             className="grid grid-cols-1 md:grid-cols-2 overflow-hidden group"
//           >
//             {/* Cột 1: Ảnh */}
//             <div className="aspect-square">
//               <img
//                 src={card.image}
//                 alt={card.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//             </div>

//             {/* Cột 2: Chữ */}
//             <div className="flex flex-col justify-center items-start p-8">
//               <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
//               <p className="text-base md:text-lg">{card.desc}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default LifestyleCards;
