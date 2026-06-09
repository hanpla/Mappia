import { create } from 'zustand';

export interface RecentActivity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

interface RecentActivitiesState {
  activities: RecentActivity[];
  loadActivities: () => void;
  addActivity: (activity: RecentActivity) => void;
}

const LOCAL_STORAGE_KEY = 'recent-activities';
const MAX_RECENT_ACTIVITIES = 5;

const useRecentActivitiesStore = create<RecentActivitiesState>((set, get) => ({
  activities: [],
  loadActivities: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        set({ activities: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('최근 본 체험 불러오기 에러:', error);
    }
  },
  addActivity: (newActivity) => {
    if (typeof window === 'undefined') return;
    const { activities } = get();

    // 중복 제거 후 가장 첫 인덱스에 추가
    const filtered = activities.filter(
      (activity) => activity.id !== newActivity.id,
    );
    const updated = [newActivity, ...filtered].slice(0, MAX_RECENT_ACTIVITIES);

    set({ activities: updated });

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('최근 본 체험 저장하기 에러:', error);
    }
  },
}));

export default useRecentActivitiesStore;
