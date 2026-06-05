'use server';

import { cookies } from 'next/headers';

import axios from 'axios';

import type { MyActivitiesContent } from '@/types/my-activities';

export interface GetMyActivitiesParams {
  cursorId?: number | null;
  size?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  return token;
};

export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<MyActivitiesContent> => {
  try {
    const accessToken = await getAccessToken();

    const res = await axios.get(`${BASE_URL}/my-activities`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    cursorId: null,
    totalCount: 0,
    activities: [],
  };
};

export const deleteMyActivity = async (activityId: number) => {
  try {
    const accessToken = await getAccessToken();
    await axios.delete(`${BASE_URL}/my-activities/${activityId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
