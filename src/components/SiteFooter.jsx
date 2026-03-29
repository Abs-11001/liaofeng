import QR_CODE from '../assets/qrcode.png'

import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONE, SITE_MAP_LNG_LAT } from '../constants/siteContact.js'

export default function SiteFooter({
  copyrightLine = (
    <>
      Copyright © 2009 - 2022 Cld , All Rights Reserved
      {}
      <span className="block mt-1 lg:mt-0 lg:inline lg:ml-1">
        某某网络科技有限公司 版权所有 陕ICP备xxxxxxx号
      </span>
    </>
  ),
  qrSrc = QR_CODE,
  qrAlt = '官网二维码',
} = {}) {
  const amapUrl = `https://www.amap.com/regeo?lng=${SITE_MAP_LNG_LAT[0]}&lat=${SITE_MAP_LNG_LAT[1]}&name=${encodeURIComponent(SITE_ADDRESS)}`
  return (
    <footer id="site-footer" className="bg-[#FF350D] min-h-[218px] py-10 px-6 text-white flex justify-center items-center">
        <div className="flex flex-col gap-8 lg:gap-10 w-fit">
          <div
            className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-[96px]"
          > 
            <p className="cursor-pointer">
              <span className="whitespace-nowrap">地址：</span>
              <a
                  href={amapUrl}
                  target="_blank"
                  className="tabular-nums underline-offset-2 hover:underline"
              >
                {SITE_ADDRESS}
              </a>
            </p>
            <p>
              <span className="whitespace-nowrap">邮箱：</span>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="tabular-nums underline-offset-2 hover:underline"
              >
                {SITE_EMAIL}
              </a>
            </p>
            <p>
              <span className="whitespace-nowrap">电话：</span>
              <a href={`tel:${SITE_PHONE.replace(/[^\d+]/g, '')}`} className="tabular-nums underline-offset-2 hover:underline">
                {SITE_PHONE}
              </a>
            </p>
          </div>

          <div className="flex flex-row items-center justify-start gap-4 lg:gap-3">
            <img
              src={qrSrc}
              alt={qrAlt || ''}
              className="w-[60px] h-[60px]"
            />
            <p className="text-white text-[16px]">
              {copyrightLine}
            </p>
          </div>
        </div>
    </footer>
  )
}