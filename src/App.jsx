import { Outlet, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import AboutUsPage from './pages/AboutUsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NewsListPage from './pages/NewsListPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import useScrollRestoration from "./hook/useScrollRestoration.jsx"

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

export default function App() {
  useScrollRestoration()
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsListPage />} />
        <Route path="news/detail/:id" element={<NewsDetailPage />} />
        <Route path="about" element={<AboutUsPage />} />
      </Route>
    </Routes>
  )
}
