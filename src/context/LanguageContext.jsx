import { createContext, useContext, useState } from 'react'
import zh_cn from '../locales/zh_cn.json'
import en_us from '../locales/en_us.json'

const languages = [
  { code: 'zh_cn', name: '简体中文', label: 'CN' },
  { code: 'en_us', name: 'English', label: 'EN' },
]

const LanguageContext = createContext(undefined)

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('ajitech_lang')
    if (stored) return stored
    const browserLang = navigator.language || navigator.languages?.[0] || ''
    return browserLang.startsWith('zh') ? 'zh_cn' : 'en_us'
  })
  
  let messages = en_us
  switch (lang) {
    case 'zh_cn':
      messages = zh_cn
      break
  }
  
  const changeLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('ajitech_lang', newLang)
  }
  
  return (
    <LanguageContext.Provider value={{ lang, messages, changeLang, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return context
}
