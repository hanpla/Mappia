import type { User } from '@/types/auth';

export async function getMe(accessToken: string): Promise<User | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
