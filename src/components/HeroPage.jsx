import React, { memo } from "react";

const HeroPage = memo(() => {
  return (
    <main className="px-1  md:px-4  pb-4 lg:px-8 lg:pb-8 rounded-2xl">
      <section className="bg-[url('images/heropage.png')] bg-fixed relative w-full h-[50vh] md:h-[100vh] sm:h-[70vh] bg-center bg-no-repeat md:bg-cover z-0 rounded-5xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,26,26,0.8)] via-[rgba(26,26,26,0.1)] to-[rgba(26,26,26,0)] z-10 rounded-2xl"></div>

        <div className="flex justify-center items-center z-20 w-full h-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center z-20 leading-tight sm:leading-normal md:leading-relaxed">
            Discover a place you'll <br /> love to live
          </h1>
        </div>
      </section>
    </main>
  );
});

export default HeroPage;
