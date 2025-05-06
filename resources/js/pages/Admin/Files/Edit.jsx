import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import FileCard from '@/Components/FileCard';

export default function Index({ files }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this file?')) {
            router.delete(route('admin.files.destroy', id));
        }
    };

    return (
        <AdminLayout title="File Management">
            <Head title="File Management" />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">All Files</h2>
                <Link
                    href={route('admin.files.create')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Add File
                </Link>
            </div>

            {files.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {files.map(file => (
                        <FileCard 
                            key={file.id} 
                            file={file} 
                            showActions={true}
                            onDelete={() => handleDelete(file.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No files have been uploaded yet.</p>
                    <Link
                        href={route('admin.files.create')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Upload Your First File
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}