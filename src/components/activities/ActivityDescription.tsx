interface ActivityDescriptionProps {
  description: string;
}

export default function ActivityDescription({
  description,
}: ActivityDescriptionProps) {
  return (
    <section className="space-y-2 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <h3 className="textlg-bold md:text2lg-bold">체험 설명</h3>
      <p className="textlg-medium leading-relaxed">{description}</p>
    </section>
  );
}
