import { test, expect, describe, vi, beforeEach } from 'vitest';
import { PostsService } from '../../app/services/posts.server';

/**
 * Mock fetch globally
 */
const mockFetch = vi.fn();
global.fetch = mockFetch;

/**
 * Mock data
 */
const mockPost = {
  id: 1,
  title: 'Test Title',
  body: 'Test Body',
  userId: 1
};

describe('PostsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createPost', () => {
    test('creates post successfully', async () => {
      // Setup mock fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPost)
      });

      // Call service
      const result = await PostsService.createPost('Test Title', 'Test Body');

      // Assert successful response
      expect(result.success).toBe(true);
      expect(result.post).toEqual(mockPost);

      // Verify fetch call
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title: 'Test Title',
            body: 'Test Body',
            userId: 1
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      );
    });

    test('handles API errors', async () => {
      // Setup mock fetch to fail
      mockFetch.mockResolvedValueOnce({
        ok: false
      });

      // Call service
      const result = await PostsService.createPost('Test Title', 'Test Body');

      // Assert error response
      expect(result.error).toBe('Failed to create post. Please try again.');
    });

    test('handles network errors', async () => {
      // Setup mock fetch to throw
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Call service
      const result = await PostsService.createPost('Test Title', 'Test Body');

      // Assert error response
      expect(result.error).toBe('Failed to create post. Please try again.');
    });
  });

  describe('getPost', () => {
    test('gets post successfully', async () => {
      // Setup mock fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPost)
      });

      // Call service
      const result = await PostsService.getPost(1);

      // Assert successful response
      expect(result).toEqual(mockPost);

      // Verify fetch call
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
    });

    test('throws error on API failure', async () => {
      // Setup mock fetch to fail
      mockFetch.mockResolvedValueOnce({
        ok: false
      });

      // Assert service throws
      await expect(PostsService.getPost(1)).rejects.toThrow('Failed to fetch post');
    });
  });

  describe('updatePost', () => {
    test('updates post successfully', async () => {
      // Setup mock fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPost)
      });

      // Call service
      const result = await PostsService.updatePost(1, 'Test Title', 'Test Body');

      // Assert successful response
      expect(result.success).toBe(true);
      expect(result.post).toEqual(mockPost);

      // Verify fetch call
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method: 'PUT',
          body: JSON.stringify({
            id: 1,
            title: 'Test Title',
            body: 'Test Body',
            userId: 1
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      );
    });

    test('handles API errors', async () => {
      // Setup mock fetch to fail
      mockFetch.mockResolvedValueOnce({
        ok: false
      });

      // Call service
      const result = await PostsService.updatePost(1, 'Test Title', 'Test Body');

      // Assert error response
      expect(result.error).toBe('Failed to update post. Please try again.');
    });

    test('handles network errors', async () => {
      // Setup mock fetch to throw
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Call service
      const result = await PostsService.updatePost(1, 'Test Title', 'Test Body');

      // Assert error response
      expect(result.error).toBe('Failed to update post. Please try again.');
    });
  });

  describe('deletePost', () => {
    test('deletes post successfully', async () => {
      // Setup mock fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      });

      // Call service
      const result = await PostsService.deletePost(1);

      // Assert successful response
      expect(result.success).toBe(true);

      // Verify fetch call
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method: 'DELETE'
        }
      );
    });

    test('handles API errors', async () => {
      // Setup mock fetch to fail
      mockFetch.mockResolvedValueOnce({
        ok: false
      });

      // Call service
      const result = await PostsService.deletePost(1);

      // Assert error response
      expect(result.error).toBe('Failed to delete post. Please try again.');
    });

    test('handles network errors', async () => {
      // Setup mock fetch to throw
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Call service
      const result = await PostsService.deletePost(1);

      // Assert error response
      expect(result.error).toBe('Failed to delete post. Please try again.');
    });
  });
}); 