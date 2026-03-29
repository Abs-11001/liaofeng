import AboutAmapMap from '../components/about/AboutAmapMap.jsx'
import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONE, SITE_MAP_LNG_LAT } from '../constants/siteContact.js'

function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
      <path d="M4 8l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path
        d="M6.5 3h3l1.5 4.5-2 1.5c1.2 2.6 3.4 4.8 6 6l1.5-2L21 14.5v3c0 .8-.7 1.5-1.5 1.5-8.3 0-15-6.7-15-15C4.5 3.7 5.2 3 6 3z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AboutUsPage() {
  const amapUrl = `https://www.amap.com/regeo?lng=${SITE_MAP_LNG_LAT[0]}&lat=${SITE_MAP_LNG_LAT[1]}&name=${encodeURIComponent(SITE_ADDRESS)}`
  return (
    <div className="bg-white pb-16 pt-[88px] text-slate-900">
      <div className="mx-auto w-[100vw] lg:w-[85vw] max-w-[1920px] lg:px-8">
        <header className="relative flex flex-col items-center py-10 text-center">
          <p
              className="-ml-2 select-none whitespace-nowrap text-[clamp(32px,5vw+24px,128px)] leading-none text-transparent hidden sm:flex"
            style={{ WebkitTextStroke: '1px #D9D9D9' }}
            aria-hidden
          >
            About us
          </p>
          <h1 className="mt-[-1em] text-[48px] font-bold">关于我们</h1>
          <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-orange-500" aria-hidden />
        </header>

        <div className="lg:mt-4 flex flex-col gap-10 lg:mt-8 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="w-full lg:w-1/2 lg:min-h-0">
            <AboutAmapMap />
          </div>

          <div className="flex w-full flex-col justify-center lg:w-1/2 px-6 lg:px-8">
            <h2 className="text-[24px] leading-[28px] text-black font-semibold">
              一家专注系统高端定制开发的公司
            </h2>
            <div className="my-8">
              <p className="text-[#353535] text-[14px] leading-[28px] font-normal">
                互联网指的是是网络与网络之间所串连成的庞大网络，这些网络以一组通用的协议相连，形成逻辑上的单一巨大国际网络。
              </p>
              <p className="text-[#353535] text-[14px] leading-[28px] font-normal">
                互联网始于1969年美国的阿帕网。这种将计算机网络互相联接在一起的方法可称作“网络互联”，在这基础上发展出覆盖全世界的全球性互联网络称互联网，即是互相连接一起的网络结构。
              </p>
              <p className="text-[#353535] text-[14px] leading-[28px] font-normal">
                我们出色的专业开发团队扎实的技术支持，优质高效的服务意识和丰厚的资源优势，提供专业的网站建设，微信小程序，APP开发，等技术服务。成果，专注于为客户提供专业有效的互联网系统解决方案。
              </p>
            </div>

            <ul className="space-y-5 text-black">
              <li className="flex gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                <span>
                  <span className="font-medium">地址：</span>
                  <a
                    href={amapUrl}
                    target="_blank"
                    className="tabular-nums underline-offset-2 hover:underline"
                  >
                    {SITE_ADDRESS}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                <span>
                  <span className="font-medium">邮箱：</span>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="tabular-nums underline-offset-2 hover:underline"
                  >
                    {SITE_EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                <span>
                  <span className="font-medium">电话：</span>
                  <a href={`tel:${SITE_PHONE.replace(/[^\d+]/g, '')}`} className="tabular-nums underline-offset-2 hover:underline">
                    {SITE_PHONE}
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
