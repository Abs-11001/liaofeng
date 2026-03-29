import BannerCarousel from '../components/home/BannerCarousel.jsx'
import ServiceScope from '../components/home/ServiceScope.jsx'
import CorporateCulture from '../components/home/CorporateCulture.jsx'
import TeamIntroduce from '../components/home/TeamIntroduce.jsx'
import NewsTrends from '../components/home/NewsTrends.jsx'

export default function HomePage() {
  return (
    <>
      <BannerCarousel />
      <ServiceScope />
      <CorporateCulture />
      <TeamIntroduce />
      <NewsTrends />
    </>
  )
}
