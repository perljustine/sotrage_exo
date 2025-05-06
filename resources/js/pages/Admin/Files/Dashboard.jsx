import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout title="Administration Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">File Management</h5>
                    <p className="mb-3 font-normal text-gray-700">View, upload, update and manage all files in the system.</p>
                    <Link
                        href={route('admin.files.index')}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                    >
                        Manage Files
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}