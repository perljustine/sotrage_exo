import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const [uploadType, setUploadType] = useState('file');
    
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        file: null,
        url: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.files.store'));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('file', file);
        
        if (file && !data.name) {
            setData('name', file.name);
        }
    };

    return (
        <AdminLayout title="Add New File">
            <Head title="Add New File" />

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <div className="flex gap-4 mb-4">
                        <button
                            type="button"
                            onClick={() => setUploadType('file')}
                            className={`px-4 py-2 rounded-md ${
                                uploadType === 'file' 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } transition-colors`}
                        >
                            Upload File
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadType('url')}
                            className={`px-4 py-2 rounded-md ${
                                uploadType === 'url' 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } transition-colors`}
                        >
                            Use URL
                        </button>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="File Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {uploadType === 'file' ? (
                        <div className="mb-4">
                            <InputLabel htmlFor="file" value="File" />
                            <input
                                id="file"
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100" className="w-full mt-2">
                                    {progress.percentage}%
                                </progress>
                            )}
                            <InputError message={errors.file} className="mt-2" />
                        </div>
                    ) : (
                        <div className="mb-4">
                            <InputLabel htmlFor="url" value="URL" />
                            <TextInput
                                id="url"
                                type="url"
                                name="url"
                                value={data.url}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            <InputError message={errors.url} className="mt-2" />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-4">
                    <PrimaryButton type="submit" className="ml-4" disabled={processing}>
                        Upload
                    </PrimaryButton>
                </div>
            </form>
        </AdminLayout>
    );
}