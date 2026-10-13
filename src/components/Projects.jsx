import { useLang } from '../context/LanguageContext';
import carpetAjiAddition from '../assets/carpet-aji-addition.png';
import downmatica from '../assets/downmatica.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useProjectCardAnimation = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.project-card');
    if (!cards) return;

    gsap.set(cards, {
      opacity: 0,
      x: -40,
    });

    const trigger = ScrollTrigger.create({
      trigger: cardsRef.current,
      start: 'top 85%',
      triggerOnce: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { cardsRef };
};

const useSectionTitleAnimation = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const elements = titleRef.current?.querySelectorAll('[data-title-animate]');
    if (!elements) return;

    gsap.set(elements, { opacity: 0, y: 25 });

    const trigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 82%',
      triggerOnce: true,
      onEnter: () => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { titleRef };
};

const projectIcons = [carpetAjiAddition, downmatica];

const Projects = () => {
  const { messages } = useLang();
  const { cardsRef: projectCardsRef } = useProjectCardAnimation();
  const { titleRef: projectsTitleRef } = useSectionTitleAnimation();

  const projects = messages.projects.projects;

  return (
    <section id="projects" className="pt-32 pb-0 relative overflow-hidden featured-content-section">
      {/* 背景渐变层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface" />

      <div className="max-w-container mx-auto px-8 relative z-10">
        {/* 项目标题区域 */}
        <div ref={projectsTitleRef} className="text-center mb-20">
          <span
            data-title-animate
            className="inline-block px-4 py-2 border border-accent/50 text-accent text-sm uppercase tracking-[0.3em] mb-6"
          >
            Portfolio
          </span>
          <h2
            data-title-animate
            className="text-5xl font-bold text-text-primary mb-6"
          >
            {messages.projects.title}
          </h2>
          <p
            data-title-animate
            className="text-xl text-text-secondary max-w-xl mx-auto"
          >
            {messages.projects.description}
          </p>
        </div>

        {/* 项目卡片区域 */}
        <div ref={projectCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              className="project-card group relative bg-dark-card border border-dark-card hover:border-accent/50 transition-all duration-500 overflow-hidden block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 relative z-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-dark-bg rounded-lg overflow-hidden border border-accent/30 group-hover:border-accent transition-colors duration-300">
                    <img src={projectIcons[index]} alt={project.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
