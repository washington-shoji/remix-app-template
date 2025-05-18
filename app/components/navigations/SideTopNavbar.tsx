import { useState } from 'react';
import { DropdownAdvancedMenu } from '../dorpdowns/DropdownAdvancedMenu';
import { DropdownAppsMenu } from '../dorpdowns/DropdownAppsMenu';
import { DropdownUserMenu } from '../dorpdowns/DropdownUserMenu';

type OpenDropdown = 'notifications' | 'apps' | 'user' | null;

interface SideTopNavbarProps {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export function SideTopNavbar({ isSidebarOpen, onSidebarToggle }: SideTopNavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);

  function handleDropdownClick(dropdown: OpenDropdown): void {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex justify-start items-center">
        <button
            onClick={onSidebarToggle}
            type="button"
          className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
              className={`w-6 h-6 ${isSidebarOpen ? 'hidden' : 'block'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
              className={`w-6 h-6 ${isSidebarOpen ? 'block' : 'hidden'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Toggle sidebar</span>
        </button>
          <div className="flex items-center justify-between mr-4">
            <img
              src="https://remix.run/_brand/remix-letter-dark.png"
              className="mr-3 h-8 bg-blue-600"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600 dark:text-white">App</span>
          </div>
      </div>
      <div className="flex items-center lg:order-2">
        {/* Notifications */}
          <div className="relative">
        <button
          type="button"
              onClick={() => handleDropdownClick('notifications')}
          className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span className="sr-only">View notifications</span>
          {/* Bell icon */}
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>
            <DropdownAdvancedMenu isOpen={openDropdown === 'notifications'} />
          </div>

        {/* Apps */}
          <div className="relative">
        <button
          type="button"
              onClick={() => handleDropdownClick('apps')}
          className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span className="sr-only">View notifications</span>
          {/* Icon */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
        </button>
            <DropdownAppsMenu isOpen={openDropdown === 'apps'} />
          </div>
          <div className="relative">
        <button
          type="button"
              onClick={() => handleDropdownClick('user')}
          className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
            alt="user photo"
          />
        </button>
            <DropdownUserMenu isOpen={openDropdown === 'user'} />
        </div>
      </div>
    </div>
  </nav>
  );
}