import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { PostsService, type Post, type PostResponse } from '~/services/posts.server';

type ActionData = PostResponse;

function isErrorResponse(data: ActionData): data is { error: string } {
  return 'error' in data;
}

function isSuccessResponse(data: ActionData): data is { success: true; post: Post } {
  return 'success' in data;
}

/**
 * Loader function to fetch the current post data
 * This simulates fetching the post we want to update
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

  const result = await PostsService.updatePost(1, title, body); // Using ID 1 as an example
  return json<ActionData>(result, {
    status: result.success ? 200 : 500
  });
}

export default function DashboardExamplePut() {
  const { post: initialPost } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Update Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This example demonstrates updating a post using the JSONPlaceholder API.
          The data won't be really updated on the server, but it will be simulated.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <Form method="post" className="space-y-4">
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialPost.title}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
              required
            />
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
              defaultValue={initialPost.body}
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Editing Post #{initialPost.id}
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
              {isSubmitting ? 'Updating...' : 'Update Post'}
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
            <h3 className="text-green-800 font-medium">Post Updated Successfully!</h3>
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