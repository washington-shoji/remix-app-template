import { test, expect, describe, vi, beforeEach } from 'vitest';
import { action, loader } from '../../app/routes/dashboard.example-put';
import { PostsService } from '../../app/services/posts.server';

/**
 * Mock PostsService
 */
vi.mock('../../app/services/posts.server', () => ({
  PostsService: {
    getPost: vi.fn(),
    updatePost: vi.fn()
  }
}));

/**
 * Mock data
 */
const mockInitialPost = {
  id: 1,
  title: 'Original Title',
  body: 'Original Body',
  userId: 1
};

const mockUpdatedPost = {
  id: 1,
  title: 'Updated Title',
  body: 'Updated Body',
  userId: 1
};

describe('Dashboard Example PUT Route', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  describe('loader', () => {
    test('returns current post data', async () => {
      // Setup mock service response
      vi.mocked(PostsService.getPost).mockResolvedValueOnce(mockInitialPost);

      // Create request with proper URL
      const request = new Request('http://test.com/dashboard/example-put', {
        method: 'GET'
      });

      // Call loader
      const response = await loader({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert response
      expect(data.post).toEqual(mockInitialPost);

      // Verify service call
      expect(PostsService.getPost).toHaveBeenCalledWith(1);
    });

    test('handles service errors', async () => {
      // Setup mock service to throw
      vi.mocked(PostsService.getPost).mockRejectedValueOnce(new Error('Failed to fetch post'));

      // Create request with proper URL
      const request = new Request('http://test.com/dashboard/example-put', {
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
    test('validates required fields', async () => {
      // Create form data without required fields
      const formData = new FormData();
      const request = new Request('http://test.com/dashboard/example-put', {
        method: 'POST',
        body: formData
      });

      // Call action
      const response = await action({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert validation error
      expect(data.error).toBe('Title and body are required');
      expect(PostsService.updatePost).not.toHaveBeenCalled();
    });

    test('updates post successfully', async () => {
      // Setup mock service response
      vi.mocked(PostsService.updatePost).mockResolvedValueOnce({
        success: true,
        post: mockUpdatedPost
      });

      // Create form data with updated fields
      const formData = new FormData();
      formData.append('title', 'Updated Title');
      formData.append('body', 'Updated Body');

      const request = new Request('http://test.com/dashboard/example-put', {
        method: 'POST',
        body: formData
      });

      // Call action
      const response = await action({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert successful response
      expect(data.success).toBe(true);
      expect(data.post).toEqual(mockUpdatedPost);

      // Verify service call
      expect(PostsService.updatePost).toHaveBeenCalledWith(1, 'Updated Title', 'Updated Body');
    });

    test('handles service errors', async () => {
      // Setup mock service to return error
      vi.mocked(PostsService.updatePost).mockResolvedValueOnce({
        error: 'Failed to update post. Please try again.'
      });

      // Create form data
      const formData = new FormData();
      formData.append('title', 'Updated Title');
      formData.append('body', 'Updated Body');

      const request = new Request('http://test.com/dashboard/example-put', {
        method: 'POST',
        body: formData
      });

      // Call action
      const response = await action({ request, context: {}, params: {} });
      const data = await response.json();

      // Assert error response
      expect(data.error).toBe('Failed to update post. Please try again.');
      expect(PostsService.updatePost).toHaveBeenCalledWith(1, 'Updated Title', 'Updated Body');
    });
  });
}); 