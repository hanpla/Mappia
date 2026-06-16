import IconGithub from '@/components/common/icon/IconGithub';

export default function GithubButton() {
  return (
    <div className="bg-ivory-F2E/40 border border-ivory-F2E">
      <a
        href="https://github.com/hanpla/Mappia"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-khaki-6B5 textmd-semibold text-white-FFF hover:bg-brown-2A2 flex w-full scale-102 cursor-pointer flex-row items-center justify-center gap-2.5 rounded-2xl px-6 py-4 shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <IconGithub size={20} color="currentColor" />
        GitHub 저장소 방문
      </a>
    </div>
  );
}
