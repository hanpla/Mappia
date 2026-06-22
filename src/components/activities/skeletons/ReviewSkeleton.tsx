const ARR_LEN_3 = [1, 2, 3];
const ARR_LEN_5 = [1, 2, 3, 4, 5];

export default function ReviewSkeleton() {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-2">
        <span className="block h-6 w-20 rounded bg-stone-200" />
        <span className="block h-5 w-12 rounded bg-stone-200" />
      </h3>

      <div className="mb-7.5 flex flex-col items-center justify-center">
        <div className="mb-0.5 block h-8 w-14 rounded bg-stone-200 md:h-10" />
        <div className="mb-1.5 block h-5 w-20 rounded bg-stone-200" />
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded bg-stone-200" />
          <span className="block h-4 w-16 rounded bg-stone-200" />
        </div>
      </div>

      <div className="mt-6 mb-6 rounded-2xl border border-stone-200 p-4">
        <div className="mb-3 block h-6 w-28 rounded bg-stone-200" />
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full rounded bg-stone-200" />
          <div className="h-4 w-4/5 rounded bg-stone-200" />
        </div>
        <div className="flex flex-wrap gap-2">
          {ARR_LEN_3.map((tag) => (
            <div key={tag} className="h-7 w-16 rounded-full bg-stone-200" />
          ))}
        </div>
      </div>

      <ul className="space-y-5">
        {ARR_LEN_3.map((id) => (
          <li
            key={id}
            className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
          >
            <div className="mb-1 flex flex-row items-center gap-2">
              <span className="block h-5 w-16 rounded bg-stone-200" />
              <span className="block h-4 w-24 rounded bg-stone-200" />
            </div>
            <div className="mb-2 flex gap-1 md:mb-3">
              {ARR_LEN_5.map((star) => (
                <div key={star} className="h-4 w-4 rounded bg-stone-200" />
              ))}
            </div>
            <div className="space-y-2 pt-0.5">
              <div className="h-4 w-full rounded bg-stone-200" />
              <div className="h-4 w-5/6 rounded bg-stone-200" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <div className="flex items-center gap-1.5 md:gap-2.5">
          {ARR_LEN_5.map((btn) => (
            <div
              key={btn}
              className="h-10 w-10 rounded-[15px] bg-stone-200 md:h-13.75 md:w-13.75"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
