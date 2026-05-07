import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex justify-between items-center mb-6 px-5 py-4 bg-white shadow-sm rounded-lg">
            <div>
                {/* Judul Halaman */}
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                
                {/* Breadcrumb Logic */}
                <nav className="text-gray-400 text-sm">
                    {Array.isArray(breadcrumb) ? breadcrumb.join(" / ") : breadcrumb}
                </nav>
            </div>

            {/* Slot untuk tombol "Add Orders" atau "Add Customer" */}
            <div className="flex items-center space-x-3">
                {children}
            </div>
        </div>
    );
}