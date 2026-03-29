import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { fetchNewsList } from '../api/news.js'
import NewsListCard from '../components/newsList/NewsListCard.jsx'
import NewsPagination, { PAGE_SIZE_OPTIONS } from '../components/newsList/NewsPagination.jsx'

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(value ?? '', 10)
  return Number.isFinite(n) && n >= 1 ? n : fallback
}

export default function NewsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = useMemo(
    () => parsePositiveInt(searchParams.get('page'), 1),
    [searchParams],
  )
  const pageSizeRaw = useMemo(() => {
    const n = Number.parseInt(searchParams.get('pageSize') ?? '', 10)
    return PAGE_SIZE_OPTIONS.includes(n) ? n : 8
  }, [searchParams])

  const [state, setState] = useState({
    loading: true,
    payload: null,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setState((s) => ({ ...s, loading: true, error: null }))
      try {
        const payload = await fetchNewsList({ page, pageSize: pageSizeRaw })
        if (cancelled) return
        setState({ loading: false, payload, error: null })

        const { links } = payload
        const nextPage = links.current
        const nextSize = links.pageSize

        const urlPage = searchParams.get('page')
        const urlSize = searchParams.get('pageSize')
        const missingQuery = urlPage === null || urlSize === null
        const invalidSize =
          urlSize !== null && !PAGE_SIZE_OPTIONS.includes(Number.parseInt(urlSize, 10))
        const mismatch = page !== nextPage || pageSizeRaw !== nextSize

        if (missingQuery || invalidSize || mismatch) {
          setSearchParams(
            { page: String(nextPage), pageSize: String(nextSize) },
            { replace: true },
          )
        }
      } catch (e) {
        if (!cancelled) setState({ loading: false, payload: null, error: e })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [page, pageSizeRaw, setSearchParams])

  const onPageChange = (p) => {
    setSearchParams({ page: String(p), pageSize: String(pageSizeRaw) })
  }

  const onPageSizeChange = (s) => {
    setSearchParams({ page: '1', pageSize: String(s) })
  }

  const list = state.payload?.data ?? []
  const links = state.payload?.links

  return (
    <div className="min-h-[60vh] bg-white pb-20 pt-[88px] text-neutral-900">
      <div className="mx-auto max-w-[1920px] w-[95vw] lg:w-[85vw] lg:px-8">
        <header className="relative flex flex-col items-center py-10 text-center">
          <p
            className="-ml-2 select-none whitespace-nowrap text-[clamp(32px,5vw+24px,128px)] leading-none text-transparent hidden sm:flex"
            style={{ WebkitTextStroke: '1px #D9D9D9' }}
            aria-hidden
          >
            News list page
          </p>
          <h1 className="mt-[-1em] text-[48px] font-bold">新闻列表页</h1>
          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-orange-500" aria-hidden />
        </header>

        {state.loading ? (
          <div className="py-24 text-center text-neutral-500">加载中…</div>
        ) : state.error ? (
          <div className="py-24 text-center text-red-600">加载失败，请稍后重试。</div>
        ) : (
          <>
            <div className="lg:mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
              {list.map((row, idx) => (
                <NewsListCard key={String(row.id) + idx} item={row} />
              ))}
            </div>

            {links ? (
              <NewsPagination
                total={links.total}
                current={links.current}
                pageSize={links.pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
