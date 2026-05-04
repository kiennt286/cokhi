import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminRouteGuard from "./components/admin/AdminRouteGuard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminPosts from "./pages/admin/AdminPosts";


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute ? <Navbar /> : null}

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRouteGuard>
                <AdminLayout />
              </AdminRouteGuard>
            }
          >
            <Route path="products" element={<AdminProducts mode="list" />} />
            <Route path="products/new" element={<AdminProducts mode="new" />} />
            <Route path="products/:id/edit" element={<AdminProducts mode="edit" />} />
            <Route path="posts" element={<AdminPosts mode="list" />} />
            <Route path="posts/new" element={<AdminPosts mode="new" />} />
            <Route path="posts/:id/edit" element={<AdminPosts mode="edit" />} />
          </Route>
        </Routes>
  

      {!isAdminRoute ? <FloatingContactButtons /> : null}
      {!isAdminRoute ? <Footer /> : null}
    </div>
  )
}


export default App