import Link from "next/link";

const ThankYou = () => {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-bg"
              width={32}
              height={32}
              patternUnits="userSpaceOnUse"
              x="100%"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Bedankt voor uw bestelling
          </h1>
          <div className="mt-6 text-base leading-7 text-slate-600">
            Uw bestelling is geplaats en wordt momenteel verwerk. U zal een
            email ontvangen met details van de bestelling.
          </div>
          <Link
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 mt-6"
            href="/"
          >
            <span>Ga naar homepagina</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
