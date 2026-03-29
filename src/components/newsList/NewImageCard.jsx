import {useEffect, useState} from "react"

export default function NewImageCard({ thumbSrc, fullSrc, alt }) {

  const [fullReady, setFullReady] = useState(false)

  useEffect(() => {
    setFullReady(false)
    const img = new Image()
    img.decoding = 'async'
    img.src = fullSrc
    if (img.complete && img.naturalWidth > 0) {
      setFullReady(true)
      return undefined
    }
    const done = () => setFullReady(true)
    img.addEventListener('load', done)
    img.addEventListener('error', done)
    return () => {
      img.removeEventListener('load', done)
      img.removeEventListener('error', done)
    }
  }, [fullSrc])

  if (!fullSrc) return null

  const thumb = thumbSrc || fullSrc

  return (
    <div className="relative h-full w-full">
      <img
        src={thumb}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          fullReady ? 'opacity-0' : 'opacity-100'
        } blur-lg scale-110`}
        aria-hidden
      />
      {!fullReady ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-white/25 backdrop-blur-md"
          aria-hidden
        />
      ) : null}
      <img
        src={fullSrc}
        alt={alt}
        className={`relative z-[2] h-full w-full object-cover transition-opacity duration-500 ease-out ${
          fullReady ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}