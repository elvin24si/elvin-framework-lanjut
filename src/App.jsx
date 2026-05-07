import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import Header from "./layouts/Header";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex min-h-screen w-full bg-gray-50">

        <Sidebar />

        <div className="flex-1 flex flex-col p-4">
          <Header />

          <main className="mt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
