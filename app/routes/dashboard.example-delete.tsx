import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { PostsService, type Post, type DeleteResponse } from '~/services/posts.server';

type ActionData = DeleteResponse;

function isErrorResponse(data: ActionData): data is { error: string } {
  return 'error' in data;
}

function isSuccessResponse(data: ActionData): data is { success: true } {
  return 'success' in data;
}

/**
 * Loader function to fetch the current post data
 * This simulates fetching the post we want to delete
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const post = await PostsService.getPost(1); // Using ID 1 as an example
    return json({ post });
  } catch (error) {
    throw new Response('Failed to load post', { status: 500 });
  }
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
  const result = await PostsService.deletePost(1); // Using ID 1 as an example
  return json<ActionData>(result, {
    status: result.success ? 200 : 500
  });
}

export default function DashboardExampleDelete() {
  const { post } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Delete Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This example demonstrates deleting a post using the JSONPlaceholder API.
          The data won't be really deleted on the server, but it will be simulated.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Current Post
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Title:</span> {post.title}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Body:</span> {post.body}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">ID:</span> {post.id}
            </p>
          </div>
        </div>

        <Form method="post" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white ${
                isSubmitting
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              } transition-colors`}
            >
              {isSubmitting ? 'Deleting...' : 'Delete Post'}
            </button>
          </div>
        </Form>

        {actionData && isErrorResponse(actionData) && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{actionData.error}</p>
          </div>
        )}

        {actionData && isSuccessResponse(actionData) && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-green-800 font-medium">Post Deleted Successfully!</h3>
          </div>
        )}
      </div>
    </div>
  );
} 