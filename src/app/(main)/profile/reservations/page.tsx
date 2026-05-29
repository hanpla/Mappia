import EmptySpace from '@/components/profile-reservations/EmptySpace';
import Title from '@/components/profile-reservations/Title';

const MOCK_DATA = [
  {
    date: '2024-01-09',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 1,
    },
  },
  {
    date: '2025-01-09',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 0,
    },
  },
];

export default function MyReservationsPage() {
  return (
    <div className="mt-5">
      <Title />
      {MOCK_DATA.length === 0 && <EmptySpace />}

      {MOCK_DATA.length > 0 && (
        <div className="mt-5">
          <div>SelectDropdown 영역</div>
          <div>캘린더 영역</div>
        </div>
      )}
    </div>
  );
}
