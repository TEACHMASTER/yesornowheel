"use client"
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoExpandOutline, IoContractOutline } from 'react-icons/io5'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import colors from 'tailwindcss/colors'
import { useTranslations } from 'next-intl'
import chroma from 'chroma-js'


interface HistoryItem {
  result: string;
  timestamp: number;
  background: string;
  fontColor: string;
}

export default function DecisionWheel({param}:{param:string}) {
  const t = useTranslations(param)
  const wheelRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [editingContent, setEditingContent] = useState(t('item'))
  const [textareaContent, setTextareaContent] = useState(t('item'))
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const [titleText, setTitleText] = useState(t('tips'))
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  

  // Update prizes generation with strict uniqueness
  const prizes = useMemo(() => {
    const lines = textareaContent
      .split('\n')
      .map(line => line.trim().toUpperCase())
      .filter(line => line.length > 0)
    
    // Filter duplicates (case-insensitive)
    const seen = new Set()
    const uniqueLines = lines.filter(line => {
      const normalized = line.toUpperCase()
      if (seen.has(normalized)) return false
      seen.add(normalized)
      return true
    })
    
    // Ensure at least 2 elements
    if (uniqueLines.length < 2) {
      return [
        { 
          background: colors.emerald[600],
          fonts: [{ text: 'YES', top: '25%', fontColor: '#FFFFFF' }] 
        },
        { 
          background: colors.amber[600],
          fonts: [{ text: 'NO', top: '25%', fontColor: '#FFFFFF' }] 
        }
      ]
    }

    // Generate harmonious colors using chroma.js
    const baseColors = [
      colors.blue[700],    // Start with some Tailwind colors as base
      colors.emerald[600],
      colors.purple[600],
      colors.rose[600],
      colors.amber[600]
    ];

    // Generate enough colors for all unique lines
    const generatedColors = chroma
      .scale(baseColors)
      .mode('lch')  // Use LCH color space for more harmonious colors
      .colors(uniqueLines.length)
      .map(color => 
        // Ensure colors are dark enough for white text
        chroma(color).darken(0.2).saturate(0.5).hex()
      );

    // Shuffle the generated colors
    const availableColors = [...generatedColors].sort(() => Math.random() - 0.5);

    return uniqueLines.map(line => {
      // Get a random color from remaining colors
      const colorIndex = Math.floor(Math.random() * availableColors.length)
      const newColor = availableColors.splice(colorIndex, 1)[0]
      
      return {
        background: newColor,
        fonts: [{
          text: line,
          top: '25%',
          fontColor: '#FFFFFF'
        }]
      }
    })
  }, [textareaContent])

  const blocks = [{ 
    padding: '10px', 
    background: 'transparent' 
  }]
  
  // 获取响应式按钮配置
  const getButtonConfig = useCallback(() => {
    if (typeof window === 'undefined') return {}

    if (isFullscreen) {
      // 全屏状态
      return {
        radius: '20%',
        pointerWidth: 12,
        pointerLength: 32,
        fonts: [{ 
          text: 'SPIN', 
          fontColor: '#FFFFFF',
          fontSize: '50px',
          fontWeight: '600',
          lineHeight: '24px'
        }]
      }
    } else if (window.innerWidth < 768) {
      // 移动端
      return {
        radius: '20%',
        pointerWidth: 6,
        pointerLength: 18,
        fonts: [{ 
          text: 'SPIN', 
          top: '-30%',
          fontColor: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '14px'
        }]
      }
    } else {
      // 桌面端默认
      return {
        radius: '20%',
        pointerWidth: 8,
        pointerLength: 24,
        fonts: [{ 
          text: 'SPIN', 
          fontColor: '#FFFFFF',
          fontSize: '30px',
          fontWeight: '600',
          lineHeight: '16px'
        }]
      }
    }
  }, [isFullscreen])

  const [buttonConfig, setButtonConfig] = useState(getButtonConfig())

  // 监听窗口大小和全屏状态变化
  useEffect(() => {
    const handleResize = () => {
      setButtonConfig(getButtonConfig())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getButtonConfig])

  // 更新buttonConfig当全屏状态改变时
  useEffect(() => {
    setButtonConfig(getButtonConfig())
  }, [isFullscreen, getButtonConfig])

  // 获取响应式转盘尺寸
  const getWheelSize = useCallback(() => {
    if (typeof window === 'undefined') return 600
    
    if (isFullscreen) {
      // 全屏状态下，取窗口高度的80%作为转盘尺寸
      const size = Math.min(window.innerHeight * 0.8, window.innerWidth * 0.5)
      return Math.floor(size)
    }
    
    // 非全屏状态
    return window.innerWidth < 768 ? 300 : 600
  }, [isFullscreen])

  const [wheelSize, setWheelSize] = useState(getWheelSize())

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWheelSize(getWheelSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getWheelSize])

  // 更新wheelSize当全屏状态改变时
  useEffect(() => {
    setWheelSize(getWheelSize())
  }, [isFullscreen, getWheelSize])

  // 处理全屏
  const handleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // 确保礼花在全屏范围内
  const confettiConfig = {
    width: typeof window !== 'undefined' ? window.innerWidth : width,
    height: typeof window !== 'undefined' ? window.innerHeight : height,
    recycle: true,
    numberOfPieces: 500,
    gravity: 0.2,
    initialVelocityY: { min: -20, max: 0 },
    wind: 0.01,
    colors: [
      '#FFD700',
      '#FFA500',
      '#FF6347',
      '#87CEEB',
      '#98FB98',
      '#DDA0DD',
    ],
  }

  // 缩短礼花持续时间到约1.7秒
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 2530)

      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  return (
    <>
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti {...confettiConfig} style={{ position: 'fixed', top: 0, left: 0 }} />
        </div>
      )}

      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div 
              ref={containerRef}
              className={`transition-all duration-300 ${
                isFullscreen 
                  ? 'fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto'
                  : ''
              }`}
            >
              <div className={`
                ${isFullscreen ? 'min-h-screen' : 'min-h-0'} 
                py-8
              `}>
                <div className={`
                  flex flex-col lg:flex-row gap-8
                  ${isFullscreen ? 'h-full items-start justify-center' : ''}
                `}>
                  {/* Left column */}
                  <div className={`
                    flex flex-col
                    ${isFullscreen ? 'lg:w-1/2' : 'w-full lg:w-2/3'}
                  `}>
                    {/* Title section */}
                    <div className="mb-4 md:mb-6 lg:mb-8 text-center">
                      {isEditingTitle ? (
                        <input
                          type="text"
                          value={titleText}
                          onChange={(e) => setTitleText(e.target.value)}
                          onBlur={() => setIsEditingTitle(false)}
                          autoFocus
                          className="text-xl md:text-xl lg:text-xl font-bold text-center w-full bg-transparent 
                            text-gray-800 dark:text-white focus:outline-none"
                        />
                      ) : (
                        <h1
                          onClick={() => setIsEditingTitle(true)}
                          className="text-xl md:text-xl lg:text-xl font-bold text-gray-800 dark:text-white 
                            cursor-pointer hover:opacity-80"
                        >
                          {titleText}
                        </h1>
                      )}
                    </div>

                    {/* Wheel container */}
                    <div className="flex justify-center items-center relative">
                      <div className="rounded-full
                        shadow-[0_0_10px_rgba(0,0,0,0.1),0_0_20px_rgba(0,0,0,0.08),0_0_30px_rgba(0,0,0,0.06)]
                        dark:shadow-[0_0_10px_rgba(255,255,255,0.05),0_0_20px_rgba(255,255,255,0.04),0_0_30px_rgba(255,255,255,0.03)]
                      ">
                        <LuckyWheel
                          ref={wheelRef}
                          width={wheelSize}
                          height={wheelSize}
                          blocks={blocks}
                          prizes={prizes}
                          buttons={[{
                            ...buttonConfig,
                            background: '#333333',
                            pointer: true
                          }]}
                          defaultConfig={{
                            speed: 30,
                            accelerationTime: 2500,
                            decelerationTime: 2500,
                            gutter: 0
                          }}
                          onStart={() => {
                            setIsSpinning(true)
                            wheelRef.current?.play()
                            setTimeout(() => {
                              const index = Math.floor(Math.random() * prizes.length)
                              wheelRef.current?.stop(index)
                            }, 2500)
                          }}
                          onEnd={(prize: any) => {
                            setIsSpinning(false)
                            const result = {
                              result: prize.fonts[0].text,
                              timestamp: Date.now(),
                              background: prize.background,
                              fontColor: prize.fonts[0].fontColor
                            }
                            setHistory(prev => [result, ...prev])
                            setShowConfetti(true)
                            setTimeout(() => setShowConfetti(false), 5000)
                          }}
                        />
                      </div>
                      
                      {/* Fullscreen button */}
                      {width >= 1024 && (
                        <button
                          onClick={handleFullscreen}
                          className={`
                            absolute bottom-4 right-4 p-2 rounded-lg
                            bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                            text-gray-600 dark:text-gray-400 transition-colors duration-200
                          `}
                        >
                          {isFullscreen ? (
                            <IoContractOutline size={24} />
                          ) : (
                            <IoExpandOutline size={24} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className={`
                    flex flex-col gap-8
                    ${isFullscreen ? 'lg:w-1/2 lg:h-full lg:max-h-screen lg:overflow-auto' : 'w-full lg:w-1/3'}
                  `}>
                    {/* History section */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {t('History')}
                      </h2>
                      <div className={`
                        overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
                        ${isFullscreen ? 'h-[35vh]' : 'h-[250px]'}
                      `}>
                        <AnimatePresence>
                          {history.map((item) => (
                            <motion.div 
                              key={item.timestamp}
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="p-4 rounded-xl mb-2 transition-all duration-200"
                              style={{
                                backgroundColor: item.background,
                                color: item.fontColor
                              }}
                            >
                              {item.result} - {new Date(item.timestamp).toLocaleTimeString()}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Custom Elements section */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        {t('Custom')}
                      </h2>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onBlur={() => setTextareaContent(editingContent)}
                        disabled={isSpinning}
                        className={`
                          w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700
                          bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                          placeholder-gray-400 dark:placeholder-gray-500
                          focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                          transition-all duration-200
                          ${isFullscreen ? 'h-[35vh]' : 'h-[250px]'}
                        `}
                        placeholder="Enter elements (one per line)..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}