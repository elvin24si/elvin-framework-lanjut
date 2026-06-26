import React, { Suspense } from 'react';
import './assets/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Dashboard        = React.lazy(() => import('./pages/Dashboard'))
const DashboardMember  = React.lazy(() => import('./pages/DashboardMember'))
const Orders           = React.lazy(() => import('./pages/Orders'))
const MyOrders         = React.lazy(() => import('./pages/MyOrders'))
const Customers        = React.lazy(() => import('./pages/Customers'))
const Products         = React.lazy(() => import('./pages/Products'))
const Components       = React.lazy(() => import('./pages/Components'))
const ProductDetail    = React.lazy(() => import('./pages/ProductDetail'))
const ErrorPage        = React.lazy(() => import('./pages/ErrorPage'))
const Fiturxyz         = React.lazy(() => import('./pages/Fiturxyz'))
const Notes            = React.lazy(() => import('./pages/Notes'))
const Login            = React.lazy(() => import('./pages/auth/Login'))
const Register         = React.lazy(() => import('./pages/auth/Register'))
const Forgot           = React.lazy(() => import('./pages/auth/Forgot'))

const Catalog          = React.lazy(() => import('./pages/Catalog'))

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <main className="mt-4">
          <Routes>
            {/* === AUTH ROUTES (publik) === */}
            <Route element={<AuthLayout />}>
              <Route path="/login"    element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot"   element={<Forgot />} />
            </Route>

            {/* === ADMIN ROUTES === */}
            <Route element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/"          element={<Dashboard />} />
              <Route path="/orders"    element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/components" element={<Components />} />
              <Route path="/fiturxyz"  element={<Fiturxyz />} />
              <Route path="/notes"     element={<Notes />} />
            </Route>

            {/* === MEMBER ROUTES === */}
            <Route element={
              <ProtectedRoute allowedRoles={['member']}>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard-member" element={<DashboardMember />} />
              <Route path="/my-orders"        element={<MyOrders />} />
              <Route path="/catalog"          element={<Catalog />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </Suspense>
    </AuthProvider>
  )
}

export default App
