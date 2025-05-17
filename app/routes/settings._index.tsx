import { Form } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Settings | Your App' },
    { name: 'description', content: 'Manage your application settings' },
  ];
};

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Application Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your application preferences and security settings.
          </p>
        </div>

        {/* Account Security */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
            <Form method="post" className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update Password
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Add additional security to your account using two-factor authentication.
                </p>
              </div>
              <button
                type="button"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h2>
            <div className="space-y-4">
              {/* GitHub */}
              <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center space-x-3">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">GitHub</p>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Connect
                </button>
              </div>

              {/* Google */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Google</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 