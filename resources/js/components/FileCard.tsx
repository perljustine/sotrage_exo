"use client"

import { Link } from "@inertiajs/react"
import { useState } from "react"
import { Trash2, Download, Eye, FileText } from "lucide-react"

interface File {
  id: string
  name: string
  url: string
}

interface FileCardProps {
  file: File
  showActions: boolean
  onDelete: (id: string) => void
}

export default function FileCard({ file, showActions, onDelete }: FileCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp)$/i)

  const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toUpperCase()
  }

  const extension = getFileExtension(file.name)

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={file.url} className="block">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          {isImage ? (
            <img
              src={file.url || "/placeholder.svg"}
              alt={file.name}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4">
              <FileText size={48} className="mb-2 text-gray-400" />
              <span className="text-lg font-bold text-gray-500">.{extension}</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="truncate text-sm font-medium text-gray-800" title={file.name}>
            {file.name}
          </h3>
        </div>
      </Link>

      {showActions && isHovering && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-gradient-to-t from-gray-900/70 to-transparent p-3">
          <Link
            href={file.url}
            className="rounded-full bg-white p-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
            as="button"
          >
            <Eye size={16} />
          </Link>

          <a
            href={file.url}
            download
            className="rounded-full bg-white p-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
          >
            <Download size={16} />
          </a>

          <button
            onClick={() => onDelete(file.id)}
            className="rounded-full bg-white p-2 text-red-500 shadow-sm transition-colors hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
