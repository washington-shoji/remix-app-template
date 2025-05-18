# Remix CRUD Template

A modern Remix starter template showcasing CRUD operations with comprehensive testing using Vitest. This template provides a solid foundation for building full-stack web applications with TypeScript, Tailwind CSS, and best practices for testing.

## Features

- 🚀 Built with [Remix](https://remix.run/docs)
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/)
- ✨ Type-safe with [TypeScript](https://www.typescriptlang.org/)
- 🧪 Testing with [Vitest](https://vitest.dev/)
- 🎯 Example CRUD operations using [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- 🔒 Type-safe API interactions
- 🌙 Dark mode with system preference detection and persistence
- 🧩 Modular service layer architecture
- 🔐 Basic authentication setup

## Theme System

The template includes a robust theme system with the following features:

### Features
- 🎨 Light and dark mode support
- 🔄 Automatic system preference detection
- 💾 Theme persistence in localStorage
- ⚡ Flash prevention on page load
- 🎯 Consistent theme across page navigations
- 📱 Responsive theme toggle in both public and authenticated layouts

### Implementation
- Uses React Context for theme state management
- Pre-hydration script to prevent theme flash
- Tailwind CSS for theme-aware styling
- TypeScript for type-safe theme handling
- Accessible theme toggle with keyboard support
- System preference media query listener

### Usage
The theme toggle is available in:
- Public layout: Top navigation bar
- Authenticated layout: Side top navigation bar

Theme preferences are:
1. Persisted in localStorage
2. Synced with system preferences when not explicitly set
3. Maintained across page refreshes and navigation

## Authentication

The template includes a basic authentication setup for demonstration purposes:

### Current Implementation
- Simple login/register forms
- Protected routes with authentication checks
- Session management using Remix sessions
- Placeholder user storage
- Basic role-based access control

### ⚠️ Important Note
The current authentication is for **demonstration purposes only**. Before deploying to production, you should:

1. Implement proper user storage (e.g., database)
2. Add secure password hashing (e.g., bcrypt)
3. Set up proper session management
4. Implement proper CSRF protection
5. Add rate limiting
6. Set up proper JWT or session-based authentication
7. Implement proper password reset flow
8. Add MFA support if needed
9. Follow security best practices

Recommended authentication solutions for production:
- [Auth.js](https://authjs.dev/) (formerly NextAuth.js)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Clerk](https://clerk.com/)
- Custom implementation using [bcrypt](https://www.npmjs.com/package/bcrypt) and [JWT](https://jwt.io/)

## CRUD Examples

The template includes complete examples of CRUD operations:

### GET Example
- Fetches and displays posts from Pokemon API and JSONPlaceholder
- Demonstrates loader data fetching
- Shows loading states and error handling
- Includes comprehensive tests

### POST Example
- Creates new posts
- Form validation
- Success/error feedback
- Loading states
- Complete test coverage

### PUT Example
- Updates existing posts
- Pre-filled form data
- Form validation
- Success/error feedback
- Comprehensive tests

### DELETE Example
- Deletes posts with confirmation
- Success/error feedback
- Loading states
- Full test coverage

## Project Structure

```
app/
├── routes/                    # Route components
│   ├── dashboard.example-get.tsx
│   ├── dashboard.example-post.tsx
│   ├── dashboard.example-put.tsx
│   ├── dashboard.example-delete.tsx
│   ├── login.tsx             # Login route
│   ├── register.tsx          # Registration route
│   └── logout.tsx            # Logout route
├── services/                  # Service layer
│   ├── posts.server.ts       # Posts service with API interactions
│   └── auth.server.ts        # Auth service (placeholder)
├── components/               # Shared components
│   └── layouts/             # Layout components
│       ├── public-layout.tsx  # Layout for public routes
│       └── protected-layout.tsx # Layout for protected routes
├── styles/                   # Global styles
└── utils/                    # Utility functions
    └── auth.ts              # Auth utilities

tests/
├── routes/                   # Route tests
│   ├── dashboard.example-get.test.ts
│   ├── dashboard.example-post.test.ts
│   ├── dashboard.example-put.test.ts
│   └── dashboard.example-delete.test.ts
└── services/                # Service tests
    ├── posts.server.test.ts
    └── auth.server.test.ts
```

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## Development

The development server will start at `http://localhost:5173` (Vite default port). The template includes:

- Hot module replacement
- TypeScript type checking
- Tailwind CSS processing
- Vitest test runner in watch mode

## Testing

The template uses Vitest for testing and includes:

- Unit tests for services
- Integration tests for routes
- Mocked API calls
- Type-safe test utilities
- Comprehensive test coverage

Run tests in watch mode:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Service Layer

The template implements a service layer pattern for API interactions:

- Type-safe request/response handling
- Centralized error handling
- Consistent API interaction patterns
- Easy to extend and modify
- Fully tested

## Styling

This template uses Tailwind CSS for styling:

- Dark mode support
- Responsive design
- Custom component styles
- Utility-first approach

## Deployment

Build your app for production:

```bash
npm run build
```

Run in production mode:

```bash
npm start
```

The build output will be in:
- `build/server`
- `build/client`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
