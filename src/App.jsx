import { lazy, useEffect } from 'react'
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
const Footer = lazy(() => import('./components/Footer'))

function AppContent() {
  const { messages } = useLang()
  useDocumentTitle(messages.title, messages.description)
  
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <FeaturedContent />
      </main>
      <Footer />
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
