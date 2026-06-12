import InfoForm, { INFO_FORM_ID } from '@/components/profile-info/InfoForm';
import Title from '@/components/profile-ui/Title';

export default function InfoPage() {
  return (
    <div>
      <Title
        title="내 정보"
        action={
          <button
            type="submit"
            form={INFO_FORM_ID}
            className="bg-brown-2A2 textlg-bold inline-flex h-12 w-30 cursor-pointer items-center justify-center rounded-xl text-center text-white"
          >
            저장하기
          </button>
        }
      />
      <InfoForm />
    </div>
  );
}
