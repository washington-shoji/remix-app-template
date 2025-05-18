import { test, expect, describe, vi, beforeEach } from 'vitest';
import { action } from '../../app/routes/dashboard.example-post';
import { PostsService } from '../../app/services/posts.server';

/**
 * Mock PostsService
 */
vi.mock('../../app/services/posts.server', () => ({
  PostsService: {
    createPost: vi.fn()
  }
}));

/**
 * Mock response data
 */
const mockCreatedPost = {
  id: 101,
  title: 'Test Title',
  body: 'Test Body',
  userId: 1
};

describe('Dashboard Example POST Route', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  test('action validates required fields', async () => {
    // Create form data without required fields
    const formData = new FormData();
    const request = new Request('http://example.com/dashboard/example-post', {
      method: 'POST',
      body: formData
    });

    // Call action
    const response = await action({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert validation error
    expect(data.error).toBe('Title and body are required');
    expect(PostsService.createPost).not.toHaveBeenCalled();
  });

  test('action creates post successfully', async () => {
    // Setup mock service response
    vi.mocked(PostsService.createPost).mockResolvedValueOnce({
      success: true,
      post: mockCreatedPost
    });

    // Create form data with required fields
    const formData = new FormData();
    formData.append('title', 'Test Title');
    formData.append('body', 'Test Body');

    const request = new Request('http://example.com/dashboard/example-post', {
      method: 'POST',
      body: formData
    });

    // Call action
    const response = await action({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert successful response
    expect(data.success).toBe(true);
    expect(data.post).toEqual(mockCreatedPost);

    // Verify service call
    expect(PostsService.createPost).toHaveBeenCalledWith('Test Title', 'Test Body');
  });

  test('action handles service errors', async () => {
    // Setup mock service to return error
    vi.mocked(PostsService.createPost).mockResolvedValueOnce({
      error: 'Failed to create post. Please try again.'
    });

    // Create form data
    const formData = new FormData();
    formData.append('title', 'Test Title');
    formData.append('body', 'Test Body');

    const request = new Request('http://example.com/dashboard/example-post', {
      method: 'POST',
      body: formData
    });

    // Call action
    const response = await action({ request, context: {}, params: {} });
    const data = await response.json();

    // Assert error response
    expect(data.error).toBe('Failed to create post. Please try again.');
    expect(PostsService.createPost).toHaveBeenCalledWith('Test Title', 'Test Body');
  });
}); 