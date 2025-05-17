import { Form } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Profile | Your App' },
    { name: 'description', content: 'Manage your profile settings' },
  ];
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Update your profile information and account preferences.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <Form method="post" className="space-y-6">
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Change
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <p className="text-sm text-gray-500">Receive email updates about your account activity.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
} 