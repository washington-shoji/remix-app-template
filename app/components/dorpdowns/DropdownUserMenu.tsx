import { Link } from "@remix-run/react";

interface DropdownUserMenuProps {
  isOpen: boolean;
  className?: string;
}

export function DropdownUserMenu({ isOpen, className = '' }: DropdownUserMenuProps) {
  return (
        <div
          className={`${!isOpen ? 'hidden' : ''} absolute right-[-50px] sm:right-0 overflow-hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl ${className}`}
          id="dropdown"
        >
          <div className="py-3 px-4">
            <span
              className="block text-sm font-semibold text-gray-900 dark:text-white"
              >Neil Sims</span>
            <span
              className="block text-sm text-gray-900 truncate dark:text-white"
              >name@flowbite.com</span>
          </div>
          <ul
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <Link
                to="/profile"
                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >My profile</Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >Account settings</Link>
            </li>
          </ul>
          <ul
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <Link
                to="/likes"
                className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                ><svg
                  className="mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                My likes</Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                ><svg
                  className="mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                  ></path>
                </svg>
                Collections</Link>
            </li>
            <li>
              <Link
                to="/pro"
                className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Pro version
                </span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
          </ul>
          <ul
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <Link
                to="/logout"
                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Sign out</Link>
            </li>
          </ul>
        </div>
  );
}