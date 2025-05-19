import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useCurrentUser, useLogout } from '../hooks/useAuth';
import {
  BellIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

function Layout() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout.mutate();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    {
      path: user ? `/profile/${user.id}` : '/profile',
      icon: UserIcon,
      text: 'Profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">SomePlatform</h1>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-b-2 border-blue-500 text-gray-900'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <link.icon className="mr-1 h-5 w-5" />
                  {link.text}
                </NavLink>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center">
              {/* Notifications */}
              <button className="ml-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-4 flex items-center">
                <div className="relative">
                  <button
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="ml-4 flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-70"
                  >
                    <ArrowRightCircleIcon className="mr-2 h-5 w-5" />
                    <span>{logout.isPending ? 'Logging out...' : 'Logout'}</span>
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={toggleMenu}
                  className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <link.icon className="mr-3 h-5 w-5" />
                    {link.text}
                  </div>
                </NavLink>
              ))}
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                disabled={logout.isPending}
                className="mt-2 flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-70"
              >
                <ArrowRightCircleIcon className="mr-3 h-5 w-5" />
                {logout.isPending ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
