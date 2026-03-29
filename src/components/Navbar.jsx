import {Link, NavLink, useLocation} from 'react-router-dom'

import logoImg from '../assets/logo.png'
import { useState } from "react"

const NAV_LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/news', label: '新闻列表页' },
  { to: '/about', label: '关于我们' },
]

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
      <header
          className={`absolute top-0 z-50 w-full ${
              isHome ? 'bg-transparent' : 'bg-[#252429]'
          }`}
      >
        <nav className="mx-auto flex w-[95vw] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link
              to="/"
              className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950/80"
          >
            <img
                src={logoImg}
                alt="企业站logo"
                className="h-8 w-auto max-w-[140px] object-contain sm:h-9"
                decoding="async"
            />
            <span className="text-base font-semibold tracking-wide text-white sm:text-lg">
            企业站
          </span>
          </Link>
          <ul className="hidden lg:flex flex flex-wrap items-center justify-end gap-4 sm:gap-8 pr-[150px]">
            {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                      to={to}
                      end={Boolean(end)}
                      className={({ isActive }) =>
                          [
                            'relative inline-block pb-1 text-sm font-medium transition-colors sm:text-base text-white/90',
                            'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:transition-transform',
                            isActive
                                ? 'text-white after:bg-[#FF350D] after:scale-x-100'
                                : 'after:bg-transparent after:scale-x-0', // 非激活时缩放为0
                          ].join(' ')
                      }
                  >
                    {label}
                  </NavLink>
                </li>
            ))}
          </ul>

          <button
              className="lg:hidden p-2 text-white/90 hover:text-white focus:outline-none relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {isMobileMenuOpen ? (
                // 关闭图标 X
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                // 菜单图标
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )}
          </button>

          {/* 背景遮罩 - 点击可关闭抽屉 */}
          <div
              className={`fixed inset-0 z-40 h-[100dvh] transition-opacity duration-300 lg:hidden ${
                  isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* 右侧滑出抽屉面板 */}
          <div
              className={`fixed top-0 right-0 z-50 h-screen w-[70%] bg-[#252429] shadow-2xl pl-8 lg:hidden transition-transform duration-300 ease-in-out  ${
                  isMobileMenuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible pointer-events-none'
              }`}
          >
            <ul className="flex flex-col pt-[80px] px-8">
              {NAV_LINKS.map(({ to, label, end }) => (
                  <li key={to} className="border-b-4 border-[#333333] last:border-none">
                    <NavLink
                        to={to}
                        end={Boolean(end)}
                        onClick={() => setIsMobileMenuOpen(false)} // 点击链接后自动收起菜单
                        className='block py-[48px] text-[24px] tracking-wide transition-colors text-white'
                    >
                      {label}
                    </NavLink>
                  </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
  )
}