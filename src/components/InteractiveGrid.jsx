import { useRef, useEffect } from 'react'

const InteractiveGrid = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let gridPattern = null
    
    const resolutionScale = 0.5
    const gridSize = 60
    
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2) * resolutionScale
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      
      createGridPattern()
      draw()
    }
    
    const createGridPattern = () => {
      const patternCanvas = document.createElement('canvas')
      patternCanvas.width = gridSize
      patternCanvas.height = gridSize
      const pCtx = patternCanvas.getContext('2d')
      
      pCtx.strokeStyle = 'rgba(0, 212, 255, 0.06)'
      pCtx.lineWidth = 0.5
      pCtx.strokeRect(0, 0, gridSize, gridSize)
      
      gridPattern = ctx.createPattern(patternCanvas, 'repeat')
    }
    
    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      ctx.clearRect(0, 0, width, height)
      
      if (gridPattern) {
        ctx.fillStyle = gridPattern
        ctx.fillRect(0, 0, width, height)
      }
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-2"
      style={{ opacity: 0.6 }}
    />
  )
}

export default InteractiveGrid