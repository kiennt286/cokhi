//icon
import icon_love from './love.png'
import up from './up.png'
import down from './down.png'

// group images
import Group3 from './Group3.png'
import Group4 from './Group4.png'
import Group5 from './Group5.png'
import Group6 from './Group6.png'
import Group7 from './Group7.png'
import Group8 from './Group8.png'
import Group9 from './Group9.png'
import Group10 from './Group10.png'
import Group11 from './Group11.png'
import Group12 from './Group12.png'
import Group13 from './Group13.png'
import Group14 from './Group14.png'
import Group15 from './Group15.png'
import Group16 from './Group16.png'
import Group17 from './Group17.png'
import Group18 from './Group18.png'
import Group19 from './Group19.png'
import Group20 from './Group20.png'
import Group21 from './Group21.png'
import Group22 from './Group22.png'
import Group23 from './Group23.png'
import Group24 from './Group24.png'
import Group25 from './Group25.png'
import Group26 from './Group26.png'
import Group27 from './Group27.png'
import Group29 from './Group29.png'
import Group30 from './Group30.png'
import Group83 from './Group83.png'
import Group84 from './Group84.png'
import Group85 from './Group85.png'
import Group86 from './Group86.png'

export const assets = {
  icon_love,
  up,
  down,
}

export const collectionGroups = [
  Group3,
  Group4,
  Group5,
  Group6,
  Group7,
  Group8,
  Group9,
  Group10,
  Group11,
  Group12,
  Group13,
  Group14,
  Group15,
  Group16,
  Group17,
  Group18,
  Group19,
  Group20,
  Group21,
  Group22,
  Group23,
  Group24,
  Group25,
  Group26,
  Group27,
  Group29,
  Group30,
  Group83,
  Group84,
  Group85,
  Group86,
]

// Kept for compatibility with existing components (e.g. BrandShowcase).
export const brandLogos = {}

const groupNumbers = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 83, 84, 85, 86,
]

export const products = collectionGroups.map((img, idx) => {
  const n = groupNumbers[idx]
  return {
    _id: String(idx + 1),
    slug: `group-${n}`,
    name: `Nhóm hình ${n}`,
    brand: "Dụng cụ CNC Bắc Ninh",
    brandSlug: "dung-cu-cnc-bac-ninh",
    price: 0,
    image: [img],
    description: `Hình nhóm sản phẩm ${n}. Liên hệ để được tư vấn và báo giá.`,
    category: idx % 2 === 0 ? "Nam" : "Nữ",
    stock: 999,
    rating: 5,
    reviews: 0,
    bestseller: true,
    discount: 0,
    createdAt: "2026-05-04",
  }
})
