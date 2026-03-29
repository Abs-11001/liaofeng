import { useEffect, useRef, useState } from 'react'
import backImg from '../../assets/service_scope_bck.png'

const IMAGES = [
  {
    src: '/images/service_scope/service_scope_img_1.webp',
    alt: '服务场景一'
  },
  {
    src: '/images/service_scope/service_scope_img_2.webp',
    alt: '服务场景二'
  },
  {
    src: '/images/service_scope/service_scope_img_3.webp',
    alt: '服务场景三'
  },
  {
    src: '/images/service_scope/service_scope_img_4.webp',
    alt: '服务场景四'
  },
]

function useOnceInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

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

export default function ServiceScope() {
  const [sectionRef, inView] = useOnceInView(0.1)

  return (
    <section
      id="service-scope"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute top-0 left-0 w-full h-[90%] bg-[#F6F6F6] z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full">

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[90vw] lg:max-w-[640px]px-4 sm:px-6 lg:px-12 flex-shrink-0">
            <div className="relative max-w-xl text-slate-800">
              <img
                src={backImg}
                alt="文字背景"
                className="pointer-events-none absolute left-[50px] top-[120px] h-full w-full overflow-visible object-cover object-left-top filter grayscale opacity-30 z-[-1]"
              />

              <div
                className={`transition-transform duration-500 ease-in-out ${
                  inView ? 'translate-x-0 opacity-100' : '-translate-x-[100vw] opacity-0'
                }`}
              >
                <div>
                  <p
                      className="select-none whitespace-nowrap text-[clamp(48px,10vw,128px)] leading-none tracking-tighter text-transparent"
                      style={{ WebkitTextStroke: '1px #D9D9D9' }}
                      aria-hidden
                  >
                    Service scope
                  </p>
                  <h2 className="text-[48px] tracking-tight mt-[-0.75em] indent-[2rem]">
                    服务范围
                  </h2>
                </div>

                <div className="descript">
                  <p className="mt-6 text-[28px] leading-[54px] lg:text-[24px] lg:leading-[45px] text-[#8B8B8B]">
                    依托百度政务混合云，汇聚城市管理及公安等政务领域的自有数据及互联网公开数据，基于百度大数据多年积累的行业模型及实战经验，提供从数据整合治理到分析挖掘的一站式大数据解决方案，助力智慧政务新时代。
                  </p>
                  <p className="mt-[48px] lg:mt-4 text-[28px] leading-[54px] lg:text-[24px] lg:leading-[45px] text-[#8B8B8B]">
                    全渠道零售方案包括B2C、O2O、B2B的场景，提供APP/小程序，支持对接饿了么、美团等第三方外卖平台，基于阿里巴巴多年沉淀的业务中台技术，建立商品、会员、交易、营销等共享服务中心，实现全渠道数据的共享和一致，帮助零售商打造线上、线下无差别的全渠道销售能力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右半部分 */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex-shrink">
          <div className="lg:pl-8 lg:pr-0 overflow-visible"> {/* lg:pr-0 贴边 */}
            
            {/* 右侧图片网格 */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6 min-w-[320px]">
              {IMAGES.map(({ src, alt }, index) => {
                // 四张图片的四个位置排列
                const layoutClasses = [
                  "col-span-7 col-start-6 row-start-1 aspect-[4/3]",
                  "col-span-3 col-start-3 row-start-1 self-end aspect-square",
                  "col-span-8 col-start-1 row-start-2 aspect-[3/2]",
                  "col-span-4 col-start-9 row-start-2 self-start aspect-[4/3]",
                ][index] || "col-span-1"

                return (
                    <div
                        key={src}
                        style={{ transitionDelay: `${index * 150 + 300}ms` }}
                        className={`overflow-hidden bg-white shadow-sm ring-1 ring-slate-200/80 transition-opacity duration-500 ease-in-out ${
                            inView ? 'opacity-100' : 'opacity-0'
                        } ${layoutClasses}`}
                    >
                      <img
                          src={src}
                          alt={alt}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                      />
                    </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}