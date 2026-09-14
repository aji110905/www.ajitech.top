import { lazy, useEffect, Suspense } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

const useDocumentTitle = (title, description) => {
  useEffect(() => {
    if (title) {
      document.title = title
    }
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      }
    }
    
    const htmlElement = document.documentElement
    const currentLang = title.includes('aji') ? 'en' : 'zh-CN'
    htmlElement.setAttribute('lang', currentLang)
  }, [title, description])
}

const FeaturedContent = lazy(() => import('./components/FeaturedContent'))
const Donate = lazy(() => import('./components/Donate'))
const Footer = lazy(() => import('./components/Footer'))

function AppContent() {
  const { messages } = useLang()
  useDocumentTitle(messages.title, messages.description)
  
  return (
    <div>
      <Navbar />
      <Suspense fallback={null}>
        <main>
          <Hero />
          <FeaturedContent />
          <Donate />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
