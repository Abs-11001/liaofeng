import { useEffect, useRef, useState } from 'react'

const MEMBERS = [
  {
    src: '/images/team_introduce/team_introduce_1.webp',
    alt: '团队成员 Jon Smith',
    name: 'Jon Smith',
    bio: '特级教师，从事教育工作10年',
  },
  {
    src: '/images/team_introduce/team_introduce_2.webp',
    alt: '团队成员 Merri Bond',
    name: 'Merri Bond',
    bio: '特级教师，从事教育工作10年',
  },
  {
    src: '/images/team_introduce/team_introduce_3.webp',
    alt: '团队成员 Samuel Fredman',
    name: 'Samuel Fredman',
    bio: '特级教师，从事教育工作10年',
  },
]

/** 标题区：判断是否进入视野 */
function useOnceInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect()
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setInView(true))
          })
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, threshold])

  return [ref, inView]
}

/**
 * 仅观察底部文案区域：需文案块本身进入视口且达到一定可见比例再播放入场动效，
 */
function useOverlayTextInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.1) return
        obs.disconnect()
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInView(true))
        })
      },
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.65, 0.8, 1],
        rootMargin: '0px 0px -10% 0px',
      },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  return [ref, inView]
}

function TeamMemberCard({ member }) {
  const [textRef, textInView] = useOverlayTextInView()

  return (
    <article className="group relative flex aspect-[3/4] w-full min-h-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:min-h-[min(85vh,800px)]">
      <img
        src={member.src}
        alt={member.alt}
        className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
        loading="lazy"
      />

      <div
        ref={textRef}
        className={
          textInView
            ? 'absolute top-[66%] flex flex-col justify-center items-center inset-x-0 animate-card-overlay-fade-in'
            : 'absolute top-[66%] flex flex-col justify-center items-center inset-x-0 opacity-0'
        }
      >
        <h3 className="text-[clamp(24px,6vw,48px)] lg:text-[clamp(32px,3vw,64px)] leading-tight text-white cursor-default font-bold">
          {member.name}
        </h3>

        <p className="mt-2 text-[32px] text-[clamp(18px,3vw,32px)] leading-relaxed text-white text-center cursor-default opacity-90">
          {member.bio}
        </p>

        <p className="mt-8 lg:mt-12 text-[28px] text-[clamp(16px,2.5vw,28px)] text-white cursor-pointer group">
          <span aria-hidden className="inline-block text-[#FF350D] mr-[12px] transition-transform group-hover:translate-x-1">
            →
          </span>
          More information
        </p>
      </div>
    </article>
  )
}

export default function TeamIntroduce() {
  const [titleRef, titleInView] = useOnceInView(0.35)

  return (
    <section id="team-intro" className="overflow-x-clip bg-white">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`relative flex h-[150px] lg:h-[250px] flex-col items-center justify-center text-center ${
            titleInView ? 'animate-title-fly-in-rtl' : 'opacity-0 [transform:translateX(2rem)]'
          }`}
        >
          <p
            className="pointer-events-none select-none text-[clamp(32px,5vw+24px,128px)] whitespace-nowrap hidden sm:flex"
            style={{
              WebkitTextStroke: '1px #D9D9D9',
              color: 'transparent'
            }}
            aria-hidden
          >
            Team to introduce
          </p>
          <div className="absolute top-[40%] z-10">
            <h2 className="text-[48px] text-black">团队介绍</h2>
            <div
              className="mx-auto lg:mt-4 h-[6px] w-[128px] bg-[#FF350D]"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div
        className="relative left-1/2 w-screen max-w-none -translate-x-1/2 sm:mt-10"
        style={{ width: '100vw' }}
      >
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
          {MEMBERS.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
