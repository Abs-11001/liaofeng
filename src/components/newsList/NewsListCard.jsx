import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewImageCard from "./NewImageCard.jsx"

function useCardTextFadeInView() {
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
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.30, 0.4, 0.5, 0.65, 0.8, 1],
        rootMargin: '0px 0px -10% 0px',
      },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  return [ref, inView]
}


/**
 * 与首页 NewsTrends 卡片结构/动效一致
 * @param {{ item: { id: string, title: string, summary: string, coverUrl: string, coverThumbUrl?: string, href?: string } }} props
 */
export default function NewsListCard({ item }) {
  const [textRef, textInView] = useCardTextFadeInView()
  const navigate = useNavigate()
  const thumb = item.coverThumbUrl ?? item.coverUrl

  const handleClick = () => {
    if (item.id) {
      navigate(`/news/detail/${item.id}`)
    }
  }

  const mediaAndText = (
    <div onClick={handleClick} className="cursor-pointer p-4 rounded-xl bg-white border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-200">
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-sm ring-1 ring-black/5">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
          <NewImageCard thumbSrc={thumb} fullSrc={item.coverUrl} alt={item.title} />
        </div>
      </div>
      <div
        ref={textRef}
        className={
          textInView
            ? 'mt-4 animate-card-overlay-fade-in sm:mt-5'
            : 'mt-4 opacity-0 sm:mt-5'
        }
      >
        <h3 className="my-6 text-[30px] leading-[48px] lg:text-[20px] font-semibold lg:leading-[36px] text-black sm:my-8 line-clamp-3">{item.title}</h3>
        <p className="text-[28px] leading-[48px]  lg:text-[14px] font-normal lg:leading-[28px] text-neutral-600 line-clamp-5">{item.summary}</p>
      </div>
    </div>
  )

  return (
    <article className="flex h-full flex-col">
      {mediaAndText}
    </article>
  )
}
