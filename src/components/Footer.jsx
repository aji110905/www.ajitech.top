import { useLang } from '../context/LanguageContext'

const Footer = () => {
  const { messages } = useLang()
  
  return (
    <footer className="py-4 bg-dark-bg border-t border-dark-card">
      <div className="max-w-container mx-auto px-8">
        <div className="text-center">
          <span className="text-text-secondary text-xs">
            {messages.footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
