import { createCookieSessionStorage, redirect } from '@remix-run/node';

// This would come from environment variables in a real app
const sessionSecret = 'your-secret-key';

const storage = createCookieSessionStorage({
  cookie: {
    name: 'app_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

export async function requireUserId(request: Request, redirectTo: string = '/login') {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
} 