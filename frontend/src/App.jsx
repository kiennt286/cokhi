import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Order from './pages/Order'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import About from './pages/About'
import Knowledge from './pages/Knowledge'
import KnowledgeDetail from './pages/KnowledgeDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContactButtons from './components/FloatingContactButtons'


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Nội dung chính */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/kien-thuc' element={<Knowledge/>}/>
          <Route path='/kien-thuc/:slug' element={<KnowledgeDetail/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/orders' element={<Order/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/:brand/:slug' element={<Product />} />
        </Routes>
  

      <FloatingContactButtons />
      <Footer />
    </div>
  )
}


export default App