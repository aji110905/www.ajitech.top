import { useLang } from '../context/LanguageContext';
import alipayQr from '../assets/donate-alipay.png';
import wechatQr from '../assets/donate-wechat.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useDonateAnimation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const titles = root.querySelectorAll('[data-title-animate]');
    const cards = root.querySelectorAll('.donate-card');
    const notice = root.querySelector('.donate-notice');

    gsap.set(titles, { opacity: 0, y: 25 });
    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.set(notice, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 82%',
      triggerOnce: true,
      onEnter: () => {
        gsap.to(titles, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.2,
          ease: 'power3.out',
        });
        gsap.to(notice, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.5,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return sectionRef;
};

const AlipayIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="#00A0EA"
      d="M860.16 0C950.272 0 1024 73.889684 1024 164.163368v531.509895s-32.768-4.122947-180.224-53.355789c-40.96-14.362947-96.256-34.896842-157.696-57.478737 36.864-63.595789 65.536-137.485474 86.016-215.444211h-202.752v-71.841684h247.808V256.512h-247.808V135.437474h-100.352c-18.432 0-18.432 18.458947-18.432 18.458947v104.663579H200.704v41.040842h249.856v69.793684H243.712v41.013895H645.12c-14.336 51.307789-34.816 98.519579-57.344 141.608421-129.024-43.115789-268.288-77.985684-356.352-55.403789-55.296 14.362947-92.16 38.992842-112.64 63.595789-96.256 116.978526-26.624 295.504842 176.128 295.504842 120.832 0 237.568-67.718737 327.68-178.526316C757.76 742.858105 1024 853.692632 1024 853.692632v6.144C1024 950.110316 950.272 1024 860.16 1024H163.84C73.728 1024 0 950.137263 0 859.836632V164.163368C0 73.889684 73.728 0 163.84 0h696.32zM268.126316 553.121684c93.049263-10.374737 180.062316 26.974316 283.270737 78.874948-74.886737 95.501474-165.941895 155.701895-256.970106 155.701894-157.830737 0-204.368842-126.652632-125.466947-197.200842 26.300632-22.851368 72.838737-35.301053 99.166316-37.376z"
    />
  </svg>
);

const WeChatIcon = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect fill="#00d332" height="64" rx="11.2" ry="11.2" width="64" />
    <path
      fill="#fff"
      d="M24.9,11.29c-10.21,0-18.49,6.9-18.49,15.41A14.53,14.53,0,0,0,13,38.49l-.67,4.88a.4.4,0,0,0,.56.42l5.88-2.55a14.46,14.46,0,0,0,6.91.86,12.14,12.14,0,0,1-.54-3.51c0-7.88,7.64-14.29,17-14.29.34,0,.68,0,1,0C41.81,17,34.15,11.29,24.9,11.29Zm-6.57,13a2.4,2.4,0,1,1,2.4-2.4A2.4,2.4,0,0,1,18.33,24.28Zm12.63,0a2.4,2.4,0,1,1,2.4-2.4A2.41,2.41,0,0,1,31,24.28Z"
    />
    <path
      fill="#fff"
      d="M57.59,38.59c0-7-6.91-12.69-15.43-12.69S26.73,31.58,26.73,38.59s6.91,12.69,15.43,12.69a18.34,18.34,0,0,0,5.56-.87l4.09,2.25a.4.4,0,0,0,.59-.39L52,48.35A11.94,11.94,0,0,0,57.59,38.59ZM37,36.08a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,37,36.08Zm10.41,0a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,47.44,36.08Z"
    />
  </svg>
);

const Donate = () => {
  const { messages } = useLang();
  const sectionRef = useDonateAnimation();
  const [activeChannel, setActiveChannel] = useState(null);

  const channels = [
    {
      id: 'alipay',
      name: messages.donate.alipay,
      qr: alipayQr,
      icon: <AlipayIcon />,
    },
    {
      id: 'wechat',
      name: messages.donate.wechat,
      qr: wechatQr,
      icon: <WeChatIcon />,
    },
  ];

  const activeChannelData = channels.find((channel) => channel.id === activeChannel);

  useEffect(() => {
    if (!activeChannel) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveChannel(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeChannel]);

  return (
    <section id="donate" className="relative py-24 overflow-hidden">
      {/* 背景渐变层：与上方深色模块衔接，向页脚深色过渡 */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-dark-surface to-dark-bg" />

      <div ref={sectionRef} className="max-w-container mx-auto px-8 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-14">
          <span
            data-title-animate
            className="inline-block px-4 py-2 border border-accent/50 text-accent text-sm uppercase tracking-[0.3em] mb-6"
          >
            {messages.donate.badge}
          </span>
          <h2
            data-title-animate
            className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
          >
            {messages.donate.title}
          </h2>
          <p
            data-title-animate
            className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto"
          >
            {messages.donate.description}
          </p>
        </div>

        {/* 收款渠道卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {channels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => setActiveChannel(channel.id)}
              aria-label={`${channel.name} - ${messages.donate.clickHint}`}
              className="donate-card group relative bg-dark-card border border-dark-card hover:border-accent/60 transition-all duration-500 p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-11 h-11">
                      {channel.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300">
                        {channel.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {messages.donate.scanHint}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-text-secondary/50 group-hover:text-accent transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>

                <div className="mt-5 bg-white p-3 overflow-hidden">
                  <img
                    src={channel.qr}
                    alt={`${channel.name} QR Code`}
                    className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="mt-3 text-center text-xs text-text-secondary group-hover:text-accent transition-colors duration-300 tracking-wider">
                  {messages.donate.clickHint}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          ))}
        </div>

        {/* 免责声明 */}
        <div className="donate-notice mt-12 max-w-2xl mx-auto flex gap-3 p-5 border border-amber-400/30 bg-amber-400/5">
          <svg
            className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-300/90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="text-amber-300/90 text-sm font-semibold tracking-wide mb-1">
              {messages.donate.disclaimerTitle}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              {messages.donate.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* 收款码放大弹窗 */}
      {activeChannelData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setActiveChannel(null)}
        >
          <div className="absolute inset-0 bg-dark-bg/85 backdrop-blur-sm donate-modal-overlay" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeChannelData.name}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-xs bg-dark-card border border-accent/30 p-6 donate-modal-panel"
          >
            <button
              type="button"
              onClick={() => setActiveChannel(null)}
              aria-label={messages.donate.close}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-300 focus:outline-none focus-visible:text-accent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="flex-shrink-0 w-10 h-10">
                {activeChannelData.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary">
                {activeChannelData.name}
              </h3>
            </div>

            <div className="mt-4 bg-white p-3">
              <img
                src={activeChannelData.qr}
                alt={`${activeChannelData.name} QR Code`}
                className="w-full aspect-square object-contain"
              />
            </div>

            <p className="mt-4 text-center text-sm text-text-secondary">
              {messages.donate.modalScan.replace('{channel}', activeChannelData.name)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Donate;
