import { test, expect, describe, vi, beforeEach } from 'vitest';
import { action, loader } from '../../app/routes/dashboard.example-delete';
import { PostsService } from '../../app/services/posts.server';

/**
 * Mock PostsService
 */
vi.mock('../../app/services/posts.server', () => ({
  PostsService: {
    getPost: vi.fn(),
    deletePost: vi.fn()
  }
}));

/**
 * Mock data
 */
const mockPost = {
  id: 1,
  title: 'Test Title',
  body: 'Test Body',
  userId: 1
};

describe('Dashboard Example DELETE Route', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  describe('loader', () => {
    test('returns current post data', async () => {
      // Setup mock service response
      vi.mocked(PostsService.getPost).mockResolvedValueOnce(mockPost);

      // Create request with proper URL
      const request = new Request('http://test.com/dashboard/example-delete', {
        method: 'GET'
      });

      // Call loader
      const response = await loader({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert response
      expect(data.post).toEqual(mockPost);

      // Verify service call
      expect(PostsService.getPost).toHaveBeenCalledWith(1);
    });

    test('handles service errors', async () => {
      // Setup mock service to throw
      vi.mocked(PostsService.getPost).mockRejectedValueOnce(new Error('Failed to fetch post'));

      // Create request with proper URL
      const request = new Request('http://test.com/dashboard/example-delete', {
        method: 'GET'
      });

      try {
        await loader({ request, context: {}, params: {} });
        // If we get here, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        const responseError = error as Response;
        expect(responseError).toBeInstanceOf(Response);
        expect(responseError.status).toBe(500);
        expect(await responseError.text()).toBe('Failed to load post');
      }
    });
  });

  describe('action', () => {
    test('deletes post successfully', async () => {
      // Setup mock service response
      vi.mocked(PostsService.deletePost).mockResolvedValueOnce({
        success: true
      });

      // Create request
      const request = new Request('http://test.com/dashboard/example-delete', {
        method: 'POST'
      });

      // Call action
      const response = await action({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert successful response
      expect(data.success).toBe(true);

      // Verify service call
      expect(PostsService.deletePost).toHaveBeenCalledWith(1);
    });

    test('handles service errors', async () => {
      // Setup mock service to return error
      vi.mocked(PostsService.deletePost).mockResolvedValueOnce({
        error: 'Failed to delete post. Please try again.'
      });

      // Create request
      const request = new Request('http://test.com/dashboard/example-delete', {
        method: 'POST'
      });

      // Call action
      const response = await action({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert error response
      expect(data.error).toBe('Failed to delete post. Please try again.');
      expect(PostsService.deletePost).toHaveBeenCalledWith(1);
    });
  });
}); 