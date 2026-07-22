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

const useLinkCardAnimation = () => {
  const linksRef = useRef(null);

  useEffect(() => {
    const links = linksRef.current?.querySelectorAll('.link-card');
    if (!links) return;

    gsap.set(links, {
      opacity: 0,
      y: 30,
    });

    const trigger = ScrollTrigger.create({
      trigger: linksRef.current,
      start: 'top 88%',
      triggerOnce: true,
      onEnter: () => {
        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { linksRef };
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

const getIconPath = (iconId) => {
  const paths = {
    blog: 'M288 88C288 74.7 298.7 64 312 64C457.8 64 576 182.2 576 328C576 341.3 565.3 352 552 352C538.7 352 528 341.3 528 328C528 208.7 431.3 112 312 112C298.7 112 288 101.3 288 88zM144 160C170.5 160 192 181.5 192 208L192 432C192 458.5 213.5 480 240 480C266.5 480 288 458.5 288 432C288 405.5 266.5 384 240 384C231.2 384 224 376.8 224 368L224 304C224 295.2 231.2 288 240 288C319.5 288 384 352.5 384 432C384 511.5 319.5 576 240 576C160.5 576 96 511.5 96 432L96 208C96 181.5 117.5 160 144 160zM312 160C404.8 160 480 235.2 480 328C480 341.3 469.3 352 456 352C442.7 352 432 341.3 432 328C432 261.7 378.3 208 312 208C298.7 208 288 197.3 288 184C288 170.7 298.7 160 312 160z',
    github: 'M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z',
    bilibili: 'M552.6 168.1C569.3 186.2 577 207.8 575.9 233.8L575.9 436.2C575.5 462.6 566.7 484.3 549.4 501.3C532.2 518.3 510.3 527.2 483.9 528L156 528C129.6 527.2 107.8 518.2 90.7 500.8C73.6 483.4 64.7 460.5 64 432.2L64 233.8C64.8 207.8 73.7 186.2 90.7 168.1C107.8 151.8 129.5 142.8 156 142L185.4 142L160 116.2C154.3 110.5 151.4 103.2 151.4 94.4C151.4 85.6 154.3 78.3 160 72.6C165.7 66.9 173 64 181.9 64C190.8 64 198 66.9 203.8 72.6L277.1 142L365.1 142L439.6 72.6C445.7 66.9 453.2 64 462 64C470.8 64 478.1 66.9 483.9 72.6C489.6 78.3 492.5 85.6 492.5 94.4C492.5 103.2 489.6 110.5 483.9 116.2L458.6 142L487.9 142C514.3 142.8 535.9 151.8 552.6 168.1zM513.8 237.8C513.4 228.2 510.1 220.4 503.1 214.3C497.9 208.2 489.1 204.9 480.4 204.5L160 204.5C150.4 204.9 142.6 208.2 136.4 214.3C130.3 220.4 127 228.2 126.6 237.8L126.6 432.2C126.6 441.4 129.9 449.2 136.4 455.7C142.9 462.2 150.8 465.5 160 465.5L480.4 465.5C489.6 465.5 497.4 462.2 503.7 455.7C510 449.2 513.4 441.4 513.8 432.2L513.8 237.8zM249.5 280.5C255.8 286.8 259.2 294.6 259.6 303.7L259.6 337C259.2 346.2 255.9 353.9 249.8 360.2C243.6 366.5 235.8 369.7 226.2 369.7C216.6 369.7 208.7 366.5 202.6 360.2C196.5 353.9 193.2 346.2 192.8 337L192.8 303.7C193.2 294.6 196.6 286.8 202.9 280.5C209.2 274.2 216.1 270.9 226.2 270.5C235.4 270.9 243.2 274.2 249.5 280.5zM441 280.5C447.3 286.8 450.7 294.6 451.1 303.7L451.1 337C450.7 346.2 447.4 353.9 441.3 360.2C435.2 366.5 427.3 369.7 417.7 369.7C408.1 369.7 400.3 366.5 394.1 360.2C387.1 353.9 384.7 346.2 384.4 337L384.4 303.7C384.7 294.6 388.1 286.8 394.4 280.5C400.7 274.2 408.5 270.9 417.7 270.5C426.9 270.9 434.7 274.2 441 280.5z',
    warehouse: 'M32 206.1L32 544C32 561.7 46.3 576 64 576C81.7 576 96 561.7 96 544L96 304C96 286.3 110.3 272 128 272L512 272C529.7 272 544 286.3 544 304L544 544C544 561.7 558.3 576 576 576C593.7 576 608 561.7 608 544L608 206.1C608 178.6 590.4 154.1 564.2 145.4L335.2 69.1C325.3 65.8 314.7 65.8 304.8 69.1L75.8 145.4C49.6 154.1 32 178.6 32 206.1zM496 320L144 320L144 384L496 384L496 320zM144 480L496 480L496 416L144 416L144 480zM496 512L144 512L144 576L496 576L496 512z',
    qq: 'M530.1 484.4C518.6 485.8 485.2 431.7 485.2 431.7C485.2 463 469.1 503.9 434.2 533.5C451 538.7 489 552.7 480 567.9C472.7 580.2 354.5 575.8 320.4 571.9C286.3 575.7 168.1 580.2 160.8 567.9C151.8 552.7 189.7 538.7 206.6 533.5C171.7 504 155.5 463.1 155.5 431.7C155.5 431.7 122.2 485.8 110.6 484.4C105.2 483.8 98.2 454.8 119.9 384.7C130.2 351.7 141.9 324.2 160 278.9C156.9 162 205.2 63.9 320.3 63.9C434 63.9 483.5 160 480.6 278.9C498.7 324.1 510.5 351.8 520.7 384.7C542.5 454.8 535.4 483.8 530 484.4z',
    key: 'M400 416C497.2 416 576 337.2 576 240C576 142.8 497.2 64 400 64C302.8 64 224 142.8 224 240C224 258.7 226.9 276.8 232.3 293.7L71 455C66.5 459.5 64 465.6 64 472L64 552C64 565.3 74.7 576 88 576L168 576C181.3 576 192 565.3 192 552L192 512L232 512C245.3 512 256 501.3 256 488L256 448L296 448C302.4 448 308.5 445.5 313 441L346.3 407.7C363.2 413.1 381.3 416 400 416zM440 160C462.1 160 480 177.9 480 200C480 222.1 462.1 240 440 240C417.9 240 400 222.1 400 200C400 177.9 417.9 160 440 160z',
  };
  return paths[iconId] || '';
};

const FeaturedContent = () => {
  const { messages } = useLang();
  const { cardsRef: projectCardsRef } = useProjectCardAnimation();
  const { linksRef } = useLinkCardAnimation();
  const { titleRef: projectsTitleRef } = useSectionTitleAnimation();
  const { titleRef: linksTitleRef } = useSectionTitleAnimation();

  const projects = messages.projects.projects;
  const links = messages.links.links;

  const linkUrls = {
    '个人博客': 'blog.ajitech.top',
    'Personal Blog': 'blog.ajitech.top',
    'Maven仓库': 'maven.ajitech.top',
    'Maven Repository': 'maven.ajitech.top',
    'QQ交流群': 'https://qm.qq.com/q/cku0sXDCzQ',
    'QQ Group': 'https://qm.qq.com/q/cku0sXDCzQ',
    'Bilibili': 'https://space.bilibili.com/1543357006',
    'GitHub': 'https://github.com/aji110905',
    'GPG公钥': 'https://github.com/aji110905.gpg',
    'GPG Key': 'https://github.com/aji110905.gpg',
    'Modrinth': 'https://modrinth.com/user/aji110905',
  };

  const linkIconIds = ['blog', 'warehouse', 'qq', 'bilibili', 'github', 'key', 'modrinth'];

  return (
    <section id="projects" className="py-32 relative overflow-hidden featured-content-section">
      {/* 背景渐变层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-surface to-dark-surface" />

      {/* 右下角光晕效果 */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-full blur-[120px]" />

      {/* 左上角紫色光晕 */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-purple-500/15 via-transparent to-transparent rounded-full blur-[100px]" />

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
        <div ref={projectCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {projects.map((project, index) => (
            <a
              key={project.name}
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

        {/* 链接标题区域 */}
        <div ref={linksTitleRef} className="text-center mb-16">
          <span
            data-title-animate
            className="inline-block px-4 py-2 border border-accent/50 text-accent text-sm uppercase tracking-[0.3em] mb-6"
          >
            Links
          </span>
          <h3
            data-title-animate
            className="text-4xl font-bold text-text-primary mb-6"
          >
            {messages.links.title}
          </h3>
          <p
            data-title-animate
            className="text-xl text-text-secondary max-w-xl mx-auto"
          >
            {messages.links.description}
          </p>
        </div>

        {/* 链接卡片区域 */}
        <div id="links" ref={linksRef}>
          <div className="flex flex-wrap justify-center gap-8">
            {links.map((link, index) => {
              const iconId = linkIconIds[index];

              if (iconId === 'modrinth') {
                return (
                  <a
                    key={link.name}
                    href={linkUrls[link.name]}
                    className="link-card group flex flex-col items-center justify-center gap-4 p-6 bg-dark-card border border-dark-card hover:border-accent/50 transition-all duration-500 w-50 h-50 overflow-hidden flex-shrink-0"
                  >
                    <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 modrinth-icon">
                      <svg viewBox="0 0 100 100" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit={1.5} preserveAspectRatio="xMidYMid meet">
                        <defs>
                          <clipPath id={`modrinth-clip-a-${index}`}>
                            <path d="M100 0H0v100h100V0ZM46.002 49.295l.076 1.757 8.83 32.963 7.843-2.102-8.596-32.094 5.804-32.932-7.997-1.41-5.96 33.818Z"/>
                          </clipPath>
                          <clipPath id={`modrinth-clip-b-${index}`}>
                            <path d="M0 0v46h50l1.368.241L99 63.578l-2.736 7.517L49.295 54H0v46h100V0H0Z"/>
                          </clipPath>
                          <clipPath id={`modrinth-clip-c-${index}`}>
                            <path d="M50 0c27.596 0 50 22.404 50 50s-22.404 50-50 50S0 77.596 0 50 22.404 0 50 0Zm0 39.549c5.768 0 10.451 4.683 10.451 10.451 0 5.768-4.683 10.451-10.451 10.451-5.768 0-10.451-4.683-10.451-10.451 0-5.768 4.683-10.451 10.451-10.451Z"/>
                          </clipPath>
                          <clipPath id={`modrinth-clip-d-${index}`}>
                            <path d="M50 0c27.596 0 50 22.404 50 50s-22.404 50-50 50S0 77.596 0 50 22.404 0 50 0Zm0 25.36c13.599 0 24.64 11.041 24.64 24.64S63.599 74.64 50 74.64 25.36 63.599 25.36 50 36.401 25.36 50 25.36Z"/>
                          </clipPath>
                        </defs>
                        <g clipPath={`url(#modrinth-clip-a-${index})`}>
                          <path fill="white" d="M50 17c18.207 0 32.988 14.787 32.988 33S68.207 83 50 83 17.012 68.213 17.012 50 31.793 17 50 17Zm0 9c13.24 0 23.988 10.755 23.988 24S63.24 74 50 74 26.012 63.245 26.012 50 36.76 26 50 26Z"/>
                        </g>
                        <g clipPath={`url(#modrinth-clip-b-${index})`}>
                          <path fill="white" d="M50 0c27.596 0 50 22.404 50 50s-22.404 50-50 50S0 77.596 0 50 22.404 0 50 0Zm0 9c22.629 0 41 18.371 41 41S72.629 91 50 91 9 72.629 9 50 27.371 9 50 9Z"/>
                        </g>
                        <g clipPath={`url(#modrinth-clip-c-${index})`}>
                          <path fill="none" stroke="white" strokeWidth="9" d="M50 50 5.171 75.882"/>
                        </g>
                        <g clipPath={`url(#modrinth-clip-d-${index})`}>
                          <path fill="none" stroke="white" strokeWidth="9" d="m50 50 50-13.397"/>
                        </g>
                        <path fill="white" d="M37.243 52.746 35 45l8-9 11-3 4 4-6 6-4 1-3 4 1.12 4.24 3.112 3.09 4.964-.598 2.866-2.964 8.196-2.196 1.464 5.464-8.098 8.026L46.83 65.49l-5.587-5.815-4-6.929Z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                      {link.name}
                    </span>
                  </a>
                );
              }

              return (
                <a
                  key={link.name}
                  href={linkUrls[link.name]}
                  className="link-card group flex flex-col items-center justify-center gap-4 p-6 bg-dark-card border border-dark-card hover:border-accent/50 transition-all duration-500 w-50 h-50 overflow-hidden flex-shrink-0"
                >
                  <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-full h-full text-white group-hover:text-accent transition-colors duration-300" viewBox="0 0 640 640" preserveAspectRatio="xMidYMid meet">
                      <path fill="currentColor" d={getIconPath(iconId)} />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
