import { lazy, useEffect, Suspense } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

/* ------------------------------------------------------------------ */
/* Hash 锚点平滑滚动（支持直接访问 /#projects、/#donate 等 URL）          */
/* ------------------------------------------------------------------ */

// URL hash 与页面模块的映射表
const SECTION_IDS = ['home', 'projects', 'links', 'donate']
// 目标模块与固定导航栏之间的间距
const SCROLL_GAP = 16

// 正在进行的自定义滚动动画句柄（用于取消旧动画，避免并发冲突）
let activeAnimationFrame = null

const cancelActiveScroll = () => {
  if (activeAnimationFrame !== null) {
    cancelAnimationFrame(activeAnimationFrame)
    activeAnimationFrame = null
  }
}

// 原生平滑滚动支持检测（Chrome / Firefox / Edge / Safari 15.4+）
const supportsNativeSmoothScroll =
  typeof window !== 'undefined' && 'scrollBehavior' in document.documentElement.style

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// 动态获取固定导航栏高度，避免写死偏移量导致定位漂移
const getNavOffset = () => {
  const nav = document.querySelector('nav')
  return (nav?.offsetHeight ?? 64) + SCROLL_GAP
}

const smoothScrollTo = (targetTop) => {
  cancelActiveScroll()
  const top = Math.max(0, Math.round(targetTop))

  // 用户偏好减少动效，或目标位置即当前位置时直接定位
  if (prefersReducedMotion()) {
    window.scrollTo(supportsNativeSmoothScroll ? { top, behavior: 'instant' } : top)
    return
  }

  // 方案一（首选）：浏览器原生平滑滚动
  if (supportsNativeSmoothScroll) {
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

  // 方案二（兼容性兜底）：requestAnimationFrame + 三次缓动函数自定义动画
  // 临时关闭 CSS scroll-behavior，防止与逐帧 scrollTo 冲突
  document.documentElement.style.scrollBehavior = 'auto'
  const startY = window.scrollY || 0
  const distance = top - startY
  if (Math.abs(distance) < 1) {
    document.documentElement.style.scrollBehavior = ''
    return
  }
  const duration = Math.min(1100, Math.max(450, Math.abs(distance) / 2))
  let startTime = null

  const step = (now) => {
    if (startTime === null) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) {
      activeAnimationFrame = requestAnimationFrame(step)
    } else {
      activeAnimationFrame = null
      document.documentElement.style.scrollBehavior = ''
    }
  }
  activeAnimationFrame = requestAnimationFrame(step)
}

// 等待懒加载（React.lazy）的目标 section 挂载到 DOM
const waitForElement = (id, timeout = 4000) =>
  new Promise((resolve) => {
    const existing = document.getElementById(id)
    if (existing) {
      resolve(existing)
      return
    }
    const started = Date.now()
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el || Date.now() - started > timeout) {
        clearInterval(timer)
        resolve(el || null)
      }
    }, 50)
  })

// 连续两帧后再计算位置，确保浏览器完成布局
const nextFrame = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  )

const getTargetTop = (el) =>
  Math.max(0, window.scrollY + el.getBoundingClientRect().top - getNavOffset())

const scrollToSection = async (hash) => {
  const id = hash?.slice(1)
  if (!id || !SECTION_IDS.includes(id)) return

  // 1. 等待懒加载模块挂载
  const el = await waitForElement(id)
  if (!el || window.location.hash !== hash) return

  // 2. 等待 Web 字体加载完成，避免字体切换引起的布局位移
  try {
    await document.fonts?.ready
  } catch {
    /* 老环境无 document.fonts 时忽略 */
  }
  await nextFrame()

  // 3. 精准计算位置并平滑滚动
  const target = document.getElementById(id)
  if (!target || window.location.hash !== hash) return
  smoothScrollTo(getTargetTop(target))

  // 4. 资源（图片等）延迟加载导致布局变化后的二次校准（仅微小偏差时瞬时修正）
  const correctPosition = () => {
    const current = document.getElementById(id)
    if (!current || window.location.hash !== hash) return
    const expected = getTargetTop(current)
    if (Math.abs(expected - window.scrollY) > 8) {
      window.scrollTo(
        supportsNativeSmoothScroll ? { top: expected, behavior: 'instant' } : expected
      )
    }
  }
  window.addEventListener('load', () => setTimeout(correctPosition, 120), { once: true })
  setTimeout(correctPosition, 1200)
}

const useHashScroll = () => {
  useEffect(() => {
    // 关闭浏览器的前进/后退自动滚动恢复，交由本逻辑统一处理
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 直接访问带 hash 的 URL（/#projects、/#donate）：初始化后平滑滚动
    if (window.location.hash) {
      scrollToSection(window.location.hash)
    }

    // 统一接管页内锚点点击，保证偏移量与动画效果一致
    const handleClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const anchor = event.target.closest?.('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!SECTION_IDS.includes(hash?.slice(1))) return
      event.preventDefault()
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
      scrollToSection(hash)
    }

    // 浏览器前进 / 后退（hash 变化）时同样平滑定位
    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToSection(window.location.hash)
      } else {
        smoothScrollTo(0)
      }
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('hashchange', handleHashChange)
      cancelActiveScroll()
    }
  }, [])
}

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

const Projects = lazy(() => import('./components/Projects'))
const Links = lazy(() => import('./components/Links'))
const Donate = lazy(() => import('./components/Donate'))
const Footer = lazy(() => import('./components/Footer'))

function AppContent() {
  const { messages } = useLang()
  useDocumentTitle(messages.title, messages.description)
  useHashScroll()
  
  return (
    <div>
      <Navbar />
      <Suspense fallback={null}>
        <main>
          <Hero />
          <Projects />
          <Links />
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
