import InfoForm from '@/components/profile-info/InfoForm';
import Title from '@/components/profile-title/Title';

export default function InfoPage() {
  return (
    <div>
      <Title
        title="내 정보"
        action={
          <button className="bg-brown-2A2 textlg-bold inline-flex h-12 w-30 items-center justify-center rounded-sm text-center text-white">
            저장하기
          </button>
        }
      />
      <InfoForm />
    </div>
  );
}
