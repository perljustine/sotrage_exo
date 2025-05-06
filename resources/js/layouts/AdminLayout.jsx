"use client"

import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import { Transition } from "@headlessui/react"
import { Home, LayoutDashboard, Files, Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react"

export default function AdminLayout({ children, title }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const page = usePage()
  const { route } = page.props

  const navigation = [
    { name: "Home", href: route("home"), icon: Home, active: page.props.route().current("home") },
    {
      name: "Dashboard",
      href: route("admin.dashboard"),
      icon: LayoutDashboard,
      active: page.props.route().current("admin.dashboard"),
    },
    {
      name: "Files",
      href: route("admin.files.index"),
      icon: Files,
      active: page.props.route().current("admin.files.index") || page.props.route().current("admin.files.create"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-blue-600 flex items-center">
                  <Files className="h-6 w-6 mr-2" />
                  <span>File Storage</span>
                </Link>
              </div>

              <div className="hidden space-x-1 sm:-my-px sm:ml-10 sm:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out ${
                      item.active
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              {/* User dropdown */}
              <div className="ml-3 relative hidden sm:block">
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-gray-700">Admin User</span>
                    <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                  </button>
                </div>
                <Transition
                  show={showUserMenu}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      href={route("profile.edit")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Your Profile
                      </div>
                    </Link>
                    <Link
                      href={route("admin.settings")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </div>
                    </Link>
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </div>
                    </Link>
                  </div>
                </Transition>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Open main menu</span>
                  {showMobileMenu ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={showMobileMenu}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <ResponsiveNavLink key={item.name} href={item.href} active={item.active}>
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </div>
                </ResponsiveNavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Admin User</div>
                  <div className="text-sm font-medium text-gray-500">admin@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route("profile.edit")}>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Your Profile
                  </div>
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route("admin.settings")}>
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route("logout")} method="post" as="button" className="w-full text-left">
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </div>
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </Transition>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  <div className="hidden sm:block">
                    {/* Placeholder for page-specific actions */}
                    {/* You can pass action buttons as props if needed */}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
  return (
    <Link
      {...props}
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? "border-blue-400 text-blue-700 bg-blue-50 focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700"
          : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
      } ${className}`}
    >
      {children}
    </Link>
  )
}
