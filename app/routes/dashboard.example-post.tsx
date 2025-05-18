import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { PostsService, type Post, type PostResponse } from '~/services/posts.server';

type ActionData = PostResponse;

function isErrorResponse(data: ActionData): data is { error: string } {
  return 'error' in data;
}

function isSuccessResponse(data: ActionData): data is { success: true; post: Post } {
  return 'success' in data;
}

/**
 * Action function to handle form submissions
 * Demonstrates:
 * 1. Form data extraction
 * 2. API interaction via PostsService
 * 3. Error handling
 * 4. Response formatting
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title')?.toString();
  const body = formData.get('body')?.toString();

  // Validate form data
  if (!title || !body) {
    return json<ActionData>(
      { error: 'Title and body are required' },
      { status: 400 }
    );
  }

  const result = await PostsService.createPost(title, body);
  return json<ActionData>(result, {
    status: result.success ? 200 : 500
  });
}

export default function DashboardExamplePost() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Create New Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This example demonstrates creating a new post using the JSONPlaceholder API.
          The data won't be really created on the server, but it will be simulated.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <Form method="post" className="space-y-4">
            <div className="sm:col-span-2">
                <label 
                    htmlFor="title" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input 
                type="text" 
                name="title" 
                id="title" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                placeholder="Type title" 
                required/>
            </div>

          <div>
            <label 
              htmlFor="body" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Body
            </label>
            <textarea
                id="body"
                name="body"
                rows={4}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors`}
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </Form>

        {actionData && isErrorResponse(actionData) && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{actionData.error}</p>
          </div>
        )}

        {actionData && isSuccessResponse(actionData) && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-green-800 font-medium">Post Created Successfully!</h3>
            <div className="mt-2">
              <p className="text-sm text-green-600">Title: {actionData.post.title}</p>
              <p className="text-sm text-green-600">Body: {actionData.post.body}</p>
              <p className="text-sm text-green-600">ID: {actionData.post.id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}