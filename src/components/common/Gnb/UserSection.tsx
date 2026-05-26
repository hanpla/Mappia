import UserProfile from './UserProfile';

export default function UserSection() {
  return (
    <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
      <span>알림</span>
      <div>
        <div className="flex items-center justify-center gap-6.25 max-md:gap-3">
          <div className="mx-4 h-5.5 w-px bg-[#DDDDDD]" />
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
