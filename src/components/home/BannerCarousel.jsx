import { useCallback, useEffect, useRef, useState } from 'react'

// 轮播图时间
const SLIDE_DURATION_MS = 5000

// 环形进度条：半径
const RING_R = 13
const RING_C = 2 * Math.PI * RING_R

// 幻灯片数据
const SLIDES = [
  {
    src: '/images/banner/banner_1_800.webp',
    srcSet: `
      /images/banner/banner_1_400.webp 400w,
      /images/banner/banner_1_800.webp 800w,
      /images/banner/banner_1_1600.webp 1600w,
      /images/banner/banner_1_2400.webp 2400w
    `,
    alt: '城市夜景',
    title: '开启互联网+ 从我们开始',
    subtitle: '域名注册、网站建设、云服务器、企业应用一站式解决',
  },
  {
    src: '/images/banner/banner_2_800.webp',
    srcSet: `
      /images/banner/banner_2_400.webp 400w,
      /images/banner/banner_2_800.webp 800w,
      /images/banner/banner_2_1600.webp 1600w,
      /images/banner/banner_2_2400.webp 2400w
    `,
    alt: '企业服务',
    title: '关于我们',
    subtitle: '企业构建互联网信息技术服务平台，领先技术变革，提升产业效率，致力于使能软件企业引领发展，服务制造企业转型升级，为政企客户提供“多快好省”的信息技术服务。',
  },
  {
    src: '/images/banner/banner_3_800.webp',
    srcSet: `
      /images/banner/banner_3_400.webp 400w,
      /images/banner/banner_3_800.webp 800w,
      /images/banner/banner_3_1600.webp 1600w,
      /images/banner/banner_3_2400.webp 2400w
    `,
    alt: '团队协作',
    title: '新闻中心',
    subtitle: '几乎所有的伟大成就，都是团队集体协作追求远大目标的结果。这些团队的领导者挑选了团队的成员，并激励他们追求自己不敢想象的成就。',
  },
]


export default function BannerCarousel() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const slideStartRef = useRef(performance.now())
  const rafRef = useRef(0)
  const progressRef = useRef(0)
  const isPausedRef = useRef(false)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // 切换轮播图
  const goToSlide = useCallback((i) => {
    setIndex(i)
    slideStartRef.current = performance.now()
    progressRef.current = 0
    setProgress(0)
  }, [])

  // 轮播图动画
  useEffect(() => {
    const tick = (now) => {
      if (!isPausedRef.current) {
        const elapsed = now - slideStartRef.current
        if (elapsed >= SLIDE_DURATION_MS) {
          setIndex((prev) => (prev + 1) % SLIDES.length)
          slideStartRef.current = now
          progressRef.current = 0
          setProgress(0)
        } else {
          setProgress(elapsed / SLIDE_DURATION_MS)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // 暂停播放
  const handlePauseEnter = useCallback(() => {
    isPausedRef.current = true
  }, [])

  const handlePauseLeave = useCallback(() => {
    slideStartRef.current = performance.now() - progressRef.current * SLIDE_DURATION_MS
    isPausedRef.current = false
  }, [])

  return (
    <section
      id="banner"
      className="relative h-[clamp(420px,100vh,540px)] lg:h-[clamp(420px,100vh,800px)] w-full overflow-hidden bg-slate-900"
      onMouseEnter={handlePauseEnter}
      onMouseLeave={handlePauseLeave}
    >
      <div className="relative h-full w-full">
        {SLIDES.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                active
                  ? 'opacity-100 z-20 pointer-events-auto'
                  : 'opacity-0 z-10 pointer-events-none'
              }`}
              aria-hidden={!active}
            >
              <img
                  src={slide.src}
                  srcSet={slide.srcSet}
                  sizes="100vw"
                  alt={slide.alt}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
              <div className="absolute inset-0 flex flex-col items-center justify-end lg:justify-center px-6 text-center sm:px-10">
                <h1 className="text-[clamp(32px,6vw,80px)] text-white">
                  {slide.title}
                </h1>
                <p className="mt-4 text-left max-w-[80vw] text-[clamp(16px,3vw,24px)] text-white leading-[56px]">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-4 top-24 z-20 flex flex-col justify-center items-center gap-3 sm:left-6 md:top-32 md:gap-4"
        aria-label="轮播指示与进度"
      >
        {SLIDES.map((_, i) => {
          const active = i === index
          const fill = active ? progress : 0
          const dashOffset = RING_C * (1 - fill)
          return (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`
                ${active ? 'h-6 w-6' : 'h-3.5 w-3.5'}
                pointer-events-auto flex items-center justify-center rounded-full
                transition-all duration-300
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400
              `}
              aria-label={`切换到第 ${i + 1} 张`}
              aria-current={active}
            >
              <svg
                className="h-9 w-9 -rotate-90"
                viewBox="0 0 36 36"
                aria-hidden
              >
                <circle
                  cx="18"
                  cy="18"
                  r={RING_R}
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={RING_R}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={dashOffset}
                />
              </svg>
            </button>
          )
        })}
      </div>
    </section>
  )
}
