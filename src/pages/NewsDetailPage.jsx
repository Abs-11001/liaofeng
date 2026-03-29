import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchNewsDetail } from '../api/news'

export default function NewsDetailPage() {
  const { id } = useParams()

  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 定义异步加载函数
    const loadDetail = async () => {
      setLoading(true)
      try {
        const res = await fetchNewsDetail(id)
        if (res && res.data) {
          setNewsData(res.data)
        }
      } catch (error) {
        console.error("加载详情过程出错:", error)
      } finally {
        // 最后都关闭加载状态
        setLoading(false)
      }
    }

    if (id) {
      loadDetail().catch(console.error)
    }
  }, [id])

  if (loading) {
    return (
        <div className="min-h-[60vh] flex justify-center items-center text-neutral-500">
          正在加载新闻详情，请稍候...
        </div>
    )
  }

  if (!newsData) {
    return (
        <div className="min-h-[60vh] flex justify-center items-center text-neutral-500 text-xl">
          未找到该新闻或已被删除。
        </div>
    )
  }

  return (
      <div className="min-h-[60vh] bg-white pt-[88px] text-neutral-900">
        <div className="mx-auto max-w-[1920px] w-[95vw] lg:w-[85vw] px-4 sm:px-6 lg:px-8">
          <header className="relative flex flex-col items-center py-10 text-center">
            <p
                className="-ml-2 select-none whitespace-nowrap text-[clamp(32px,5vw+24px,128px)] leading-none text-transparent hidden sm:flex"
                style={{ WebkitTextStroke: '1px #D9D9D9' }}
                aria-hidden
            >
              News details page
            </p>
            <h1 className="mt-[-1em] text-[48px] font-bold">新闻详情页</h1>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-orange-500" aria-hidden />
          </header>

          <article>
            <div className="mx-auto">
              <h2 className="mb-6 text-center font-semibold text-[32px] leading-[48px] lg:text-[36px] lg:leading-[36px]">
                {newsData.title}
              </h2>

              <div className="mb-8 flex justify-center items-center gap-4 text-[16px] lg:leading-[28px] text-[#B1B1B1] font-normal">
                <span>{newsData.publish_time || '发布时间未知'}</span>
                <span>来源：人民日报</span>
              </div>

              <div
                  className="prose prose-lg max-w-none text-neutral-700 text-[28px] leading-[48px] lg:text-[16px] lg:leading-[28px] [&_.edit]:py-8"
                  dangerouslySetInnerHTML={{ __html: newsData.content }}
              />
            </div>
          </article>
        </div>
      </div>
  )
}