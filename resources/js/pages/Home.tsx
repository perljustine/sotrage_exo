import MainLayout from "@/Layouts/MainLayout"
import FileCard from "@/components/FileCard"
import { Head } from "@inertiajs/react"
import { PlusCircle } from "lucide-react"
import { Link } from "@inertiajs/react"

interface File {
  id: string
  name: string
  url: string
}

interface HomeProps {
  imageFiles: File[]
  otherFiles: File[]
}

export default function Home({ imageFiles, otherFiles }: HomeProps) {
  return (
    <MainLayout>
      <Head title="File Storage | Home" />

      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">File Storage</h1>

            <Link
              href="/upload"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusCircle size={18} className="mr-2" />
              Upload Files
            </Link>
          </div>

          <div className="mb-12 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Images</h2>
              {imageFiles.length > 0 && (
                <Link href="/images" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              )}
            </div>

            {imageFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {imageFiles.map((file) => (
                  <FileCard key={file.id} file={file} showActions={true} onDelete={() => {}} />
                ))}
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <p className="text-gray-500">No images found.</p>
                <Link href="/upload" className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                  Upload your first image
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Other Files</h2>
              {otherFiles.length > 0 && (
                <Link href="/files" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              )}
            </div>

            {otherFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {otherFiles.map((file) => (
                  <FileCard key={file.id} file={file} showActions={true} onDelete={() => {}} />
                ))}
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <p className="text-gray-500">No other files found.</p>
                <Link href="/upload" className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                  Upload your first file
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
