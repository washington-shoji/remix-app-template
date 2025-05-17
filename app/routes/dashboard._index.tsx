import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard | Your App' },
    { name: 'description', content: 'Dashboard overview of your application' },
  ];
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            New Project
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
            <span className="text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full text-xs">
              +12.5%
            </span>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mt-2">24</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Active Tasks</h3>
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
              +8.2%
            </span>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mt-2">156</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Team Members</h3>
            <span className="text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full text-xs">
              +4.0%
            </span>
          </div>
          <p className="text-3xl font-semibold text-gray-900 mt-2">12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 py-3 border-b last:border-0">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New project created</p>
                  <p className="text-sm text-gray-500">Project XYZ was created by John Doe</p>
                </div>
                <div className="text-sm text-gray-500">2h ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 