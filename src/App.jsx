import React, { Suspense } from 'react';
import './assets/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Loading from './components/Loading';
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const Products = React.lazy(() => import("./pages/Products"))
const Components = React.lazy(() => import("./pages/Components"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))


function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className="mt-4">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/components" element={<Components />} />
              <Route path="/products/" element={<Products />} /> 
              <Route path="/products/:id" element={<ProductDetail />} /> 
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<Forgot />} />
            </Route>
          </Routes>
        </main>
      </Suspense>
    </>
  )
}

export default App
