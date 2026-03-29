import { useEffect, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'

import { SITE_MAP_BUILDING_NAME, SITE_MAP_LNG_LAT } from '../../constants/siteContact.js'

/**
 * 高德地图：使用固定经纬度打点，标注大厦名称。
 */
export default function AboutAmapMap({
  lngLat = SITE_MAP_LNG_LAT,
  buildingName = SITE_MAP_BUILDING_NAME,
} = {}) {
  const amapKey = import.meta.env.VITE_AMAP_KEY
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [hint, setHint] = useState(() => (amapKey ? null : 'missing_key'))

  useEffect(() => {
    if (!amapKey) return

    const securityCode = import.meta.env.VITE_AMAP_SECURITY_CODE
    if (securityCode && typeof window !== 'undefined') {
      window._AMapSecurityConfig = { securityJsCode: securityCode }
    }

    let cancelled = false

    AMapLoader.load({
      key: amapKey,
      version: '2.0',
      plugins: ['AMap.Scale'],
    })
      .then((AMap) => {
        if (cancelled || !containerRef.current) return

        const position = new AMap.LngLat(lngLat[0], lngLat[1])
        const map = new AMap.Map(containerRef.current, {
          zoom: 17,
          center: position,
          viewMode: '2D',
        })
        mapRef.current = map
        map.addControl(new AMap.Scale({ position: 'LB' }))

        const mapUrl = `https://www.amap.com/regeo?lng=${lngLat[0]}&lat=${lngLat[1]}&name=${encodeURIComponent(buildingName)}`
        const marker = new AMap.Marker({
          position,
          title: buildingName,
          cursor: 'pointer',
        })

        marker.setMap(map)
        marker.setLabel({
          direction: 'top',
          offset: new AMap.Pixel(0, -10),
          content: `<div style="padding:6px 10px;border-radius:4px;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.2);font-size:13px;color:#111;white-space:nowrap;">${buildingName}</div>`,
        })
        marker.on('click', () => {
          window.open(mapUrl, '_blank')
        })
      })
      .catch(() => {
        if (!cancelled) setHint('load_error')
      })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
    }
  }, [amapKey, lngLat, buildingName])

  if (hint === 'missing_key') {
    return (
      <div className="flex h-[min(56vh,420px)] min-h-[260px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-700">地图需配置高德 Key</p>
        <p>
          在项目根目录创建{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">.env</code>{' '}
          ，设置 <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">VITE_AMAP_KEY</code>
          ；若控制台已启用安全密钥，同时设置{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">VITE_AMAP_SECURITY_CODE</code>。
        </p>
      </div>
    )
  }

  if (hint === 'load_error') {
    return (
      <div className="flex h-[min(56vh,420px)] min-h-[260px] w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-600">
        地图加载失败，请检查 Key、安全密钥与域名白名单配置。
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-[min(56vh,420px)] min-h-[260px] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 cursor-pointer"
    />
  )
}
