import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

const DynamicBackground: React.FC = () => {
  const [circles, setCircles] = useState<
    Array<{ x: number; y: number; dx: number; dy: number }>
  >([])

  useEffect(() => {
    const newCircles = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 3, // Speed and direction in X
      dy: (Math.random() - 0.5) * 3 // Speed and direction in Y
    }))
    setCircles(newCircles)

    const interval = setInterval(() => {
      setCircles((circles) =>
        circles.map((circle) => ({
          ...circle,
          x: (circle.x + circle.dx + window.innerWidth) % window.innerWidth,
          y: (circle.y + circle.dy + window.innerHeight) % window.innerHeight
        }))
      )
    }, 50) // A shorter interval for smoother animation

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      {circles.map((circle, index) => (
        <svg
          key={index}
          className={styles.svgIcon}
          style={{ left: circle.x, top: circle.y }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="20" /> {/* Smaller circle */}
        </svg>
      ))}
    </div>
  )
}

export default DynamicBackground
