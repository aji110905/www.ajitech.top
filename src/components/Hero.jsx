import { useLang } from '../context/LanguageContext';
import SideRays from './SideRays';
import InteractiveGrid from './InteractiveGrid';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef } from 'react';

const useHeroAnimation = () => {
  const welcomeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const arrowRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.3
    );

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        scale: 1.2,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power4.out',
      },
      0.5
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.8
    );

    tl.fromTo(
      descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      1
    );

    tl.fromTo(
      arrowRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.8
    );

    tl.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    }, 2.2);
  }, [hasAnimated]);

  return {
    welcomeRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    arrowRef,
  };
};

const Hero = () => {
  const { messages } = useLang();
  const {
    welcomeRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    arrowRef,
  } = useHeroAnimation();

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-dark-bg">
        <SideRays
          speed={1}
          rayColor1="#00d4ff"
          rayColor2="#a855f7"
          intensity={2.3}
          spread={3}
          origin="top-left"
          tilt={25}
          saturation={1.5}
          blend={0.7}
          falloff={1}
          opacity={1.0}
        />
        <InteractiveGrid />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="max-w-container mx-auto px-8">
          <div className="text-center">
            {/* Welcome 文字 */}
            <p
              ref={welcomeRef}
              className="text-text-secondary text-lg uppercase tracking-[0.4em] mb-6"
            >
              {messages.hero.welcome}
            </p>

            {/* 标题与副标题 */}
            <div className="flex items-baseline justify-center flex-wrap gap-4">
              <h1
                ref={titleRef}
                className="text-7xl md:text-8xl lg:text-9xl font-black text-text-primary tracking-tight"
              >
                {messages.hero.title}
              </h1>
              <span
                ref={subtitleRef}
                className="text-text-secondary text-xl md:text-2xl"
              >
                {messages.hero.subtitle}
              </span>
            </div>

            {/* 描述文字 */}
            <p
              ref={descriptionRef}
              className="text-text-secondary text-2xl md:text-3xl mt-8"
            >
              {messages.hero.description}
            </p>
          </div>
        </div>

        {/* 向下箭头 */}
        <div ref={arrowRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg className="w-8 h-8 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
