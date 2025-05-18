import { json } from '@remix-run/node';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type PostResponse = 
  | { error: string; success?: never; post?: never }
  | { error?: never; success: true; post: Post };

export type DeleteResponse = 
  | { error: string; success?: never }
  | { error?: never; success: true };

export class PostsService {
  private static BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * Create a new post
   */
  static async createPost(title: string, body: string): Promise<PostResponse> {
    try {
      const response = await fetch(this.BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          userId: 1, // Using a fixed userId for example
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const post = await response.json();
      return { post, success: true };
    } catch (error) {
      return { error: 'Failed to create post. Please try again.' };
    }
  }

  /**
   * Get a post by ID
   */
  static async getPost(id: number): Promise<Post> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    return response.json();
  }

  /**
   * Update an existing post
   */
  static async updatePost(id: number, title: string, body: string): Promise<PostResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          title,
          body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const post = await response.json();
      return { post, success: true };
    } catch (error) {
      return { error: 'Failed to update post. Please try again.' };
    }
  }

  /**
   * Delete a post by ID
   */
  static async deletePost(id: number): Promise<DeleteResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      return { success: true };
    } catch (error) {
      return { error: 'Failed to delete post. Please try again.' };
    }
  }
} 