const BASE = import.meta.env.BASE_URL;

type BrandLogoProps = {
  /** Tailwind size classes for the mark, e.g. "w-8 h-8" */
  className?: string;
  /** Show the NextGenWebs wordmark beside the mark */
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

/**
 * Site brand mark — always uses the same asset as the browser favicon
 * (`public/favicon.svg`) so header, favicon and PWA icon stay in sync.
 */
export default function BrandLogo({
  className = 'w-8 h-8',
  showWordmark = true,
  wordmarkClassName = 'font-bold text-sm tracking-widest uppercase hidden sm:block',
}: BrandLogoProps) {
  return (
    <>
      <img
        src={`${BASE}favicon.svg`}
        alt=""
        width={32}
        height={32}
        className={`${className} rounded-xl shrink-0`}
        aria-hidden="true"
      />
      {showWordmark ? (
        <span className={wordmarkClassName}>NextGenWebs</span>
      ) : null}
    </>
  );
}
