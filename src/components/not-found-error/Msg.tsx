interface MsgProps {
  title: string;
  description: string;
}

export default function Msg({ title, description }: MsgProps) {
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-neutral-800">
        {title}
      </h2>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>
    </>
  );
}
