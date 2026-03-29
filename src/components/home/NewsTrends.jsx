import { useEffect, useRef, useState } from 'react'

import { fetchNewsList } from '../../api/news.js'
import NewImageCard from "../newsList/NewImageCard.jsx"
import {useNavigate} from "react-router-dom"

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

/** 文案区域进入视口且可见比例足够时再播放入场渐显 */
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
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.65, 0.8, 1],
        rootMargin: '0px 0px -10% 0px',
      },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  return [ref, inView]
}

function NewsCard({ item }) {
  const [textRef, textInView] = useCardTextFadeInView()
  const navigate = useNavigate()

  const { id, title, summary, coverThumbUrl, coverUrl } = item

  const handleClick = () => {
    if (item.id) {
      navigate(`/news/detail/${id}`)
    }
  }

  const mediaAndText = (
    <>
      <div className="group relative aspect-[3/4] w-full overflow-hidden bg-neutral-800">
        <NewImageCard thumbSrc={coverThumbUrl} fullSrc={coverUrl} alt={title} />
      </div>
      <div
        ref={textRef}
        className={
          textInView
            ? 'mt-4 animate-card-overlay-fade-in sm:mt-5'
            : 'mt-4 opacity-0 sm:mt-5'
        }
      >
        <h3 className="my-8 text-[30px] lg:text-[20px] leading-[48px] lg:leading-[36px] font-[600] text-white line-clamp-3">{title}</h3>
        <p className="text-[28px] lg:text-[14px] leading-[48px] lg:leading-[28px] font-[400] text-white line-clamp-5">{summary}</p>
      </div>
    </>
  )

  return (
    <article className="flex h-full flex-col cursor-pointer p-4 rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-600" onClick={handleClick}>
      <div className="block h-full">{mediaAndText}</div>
    </article>
  )
}

export default function NewsTrends() {
  const [list, setList] = useState([])
  const [titleRef, titleInView] = useOnceInView(0.35)

  useEffect(() => {
    fetchNewsList({ page: 1, pageSize: 4 })
        .then(items => setList(items?.data ?? []))
        .catch(err => console.error(err))
  }, [])

  return (
    <section
      id="news-trends"
      className="bg-[#252429] py-8 text-neutral-100"
    >
      <div className="relative mx-auto w-[80%]">
        <div
          ref={titleRef}
          className={`relative flex h-[250px] flex-col items-center justify-center text-center ${
            titleInView ? 'animate-title-fly-in-rtl' : 'opacity-0 [transform:translateX(2rem)]'
          }`}
        >
          <p
            className="pointer-events-none select-none text-[clamp(32px,5vw+24px,128px)] text-[#252429]] whitespace-nowrap hidden sm:flex"
            style={{
              WebkitTextStroke: '1px #353535',
              color: 'transparent'
            }}
            aria-hidden
          >
            news and trends
          </p>
          <div className="absolute top-1/2 z-10">
            <h2 className="text-[48px] text-white">新闻动态</h2>
            <div
              className="mx-auto mt-4 h-[6px] w-[128px] bg-[#FF350D]"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {list.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
