"use client";

export default function SkipToContent() {
  const handleSkip = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-green focus:text-bg focus:rounded-lg focus:font-semibold focus:shadow-2xl focus:shadow-green/50"
    >
      Skip to content
    </button>
  );
}
