import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10 text-white">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Your Reels Reference Hub</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Collect video references by simply pasting links. View them as playable tiles in a clean grid—perfect for planning your next reels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
