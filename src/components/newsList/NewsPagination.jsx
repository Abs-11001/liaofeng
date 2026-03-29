import { useEffect, useMemo, useState } from 'react'

const PAGE_SIZE_OPTIONS = [8, 16, 24]

function buildPageItems(current, totalPages) {
  if (totalPages <= 0) return []
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // 计算当前页左右两侧应该显示的页码（只保留左右各1个，即 delta = 1）
  const leftSibling = Math.max(current - 1, 2)
  const rightSibling = Math.min(current + 1, totalPages - 1)

  // 判断是否需要显示左右省略号
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  // 只有右侧需要省略号 (1 2 3 4 5 ... 100)
  if (!showLeftEllipsis && showRightEllipsis) {
    return [1, 2, 'ellipsis', totalPages]
  }

  // 只有左侧需要省略号 (1 ... 96 97 98 99 100)
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', totalPages - 1, totalPages]
  }

  // 两边都需要省略号 (1 ... 49 50 51 ... 100)
  if (showLeftEllipsis && showRightEllipsis) {
    return [1, 'ellipsis', current, 'ellipsis', totalPages]
  }

  return []
}

export default function NewsPagination({
  total,
  current,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safeCurrent = Math.min(Math.max(1, current), totalPages)
  const items = useMemo(() => buildPageItems(safeCurrent, totalPages), [safeCurrent, totalPages])
  const [jumpValue, setJumpValue] = useState(String(safeCurrent))

  useEffect(() => {
    setJumpValue(String(safeCurrent))
  }, [safeCurrent])

  const go = (p) => {
    const next = Math.min(Math.max(1, p), totalPages)
    onPageChange(next)
    setJumpValue(String(next))
  }
  
  const handleJump = () => {
    const n = Number.parseInt(jumpValue, 10)
    if (!Number.isFinite(n)) return
  
    go(n)
  }

  return (
    <div className="w-full mt-14 flex flex-nowrap justify-center items-center gap-2 overflow-x-auto text-[16px] sm:gap-4 lg:text-[14px]">
      <label className="flex shrink-0 items-center gap-1 sm:gap-2">
        <span className="sr-only">每页条数</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="shrink-0 rounded-md border border-neutral-300 bg-white px-1.5 py-1.5 text-neutral-400 shadow-sm focus:outline-none sm:px-3 sm:py-2"
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} 条/页
            </option>
          ))}
        </select>
      </label>

      <nav className="flex shrink-0 flex-nowrap items-center justify-center gap-0.5 sm:gap-1" aria-label="分页">
        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:py-2"
          onClick={() => go(safeCurrent - 1)}
          disabled={safeCurrent <= 1}
        >
          &lt;
        </button>

        <div className="mx-0.5 flex flex-nowrap items-center justify-center gap-0.5 sm:mx-1 sm:gap-1">
          {items.map((it, idx) =>
            it === 'ellipsis' ? (
              <span key={`e-${idx}`} className="shrink-0 px-1 py-1.5 text-neutral-400 sm:px-2 sm:py-2">
                …
              </span>
            ) : (
              <button
                key={it}
                type="button"
                onClick={() => go(it)}
                className={`shrink-0 min-w-[1.75rem] sm:min-w-[2.5rem] rounded-md px-1.5 py-1.5 sm:px-3 sm:py-2 tabular-nums transition-colors ${
                  it === safeCurrent
                    ? 'bg-orange-500 font-semibold text-white'
                    : 'text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {it}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:py-2"
          onClick={() => go(safeCurrent + 1)}
          disabled={safeCurrent >= totalPages}
        >
          &gt;
        </button>
      </nav>

      <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
        <span className="text-neutral-400 whitespace-nowrap">前往</span>

        <input
          type="text"
          inputMode="numeric"
          value={jumpValue}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '')
            setJumpValue(val)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleJump()
            }
          }}
          onBlur={() => {
            if (!jumpValue) return
            const n = Math.max(1, Math.min(totalPages, Number(jumpValue)))
            setJumpValue(n.toString())
          }}
          className="shrink-0 w-10 sm:w-16 rounded-md border border-neutral-300 px-1 py-1.5 sm:px-2 sm:py-2 text-center tabular-nums text-neutral-400 focus:outline-none"
        />

        <span className="text-neutral-400 whitespace-nowrap">页</span>
      </div>
    </div>
  )
}

export { PAGE_SIZE_OPTIONS }
