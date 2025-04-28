// components/Sidebar.tsx
'use client'

import React, { FC } from 'react'

interface SidebarProps {
  /** What the user selected for each question (or null) */
  answers: (number | null)[]
  /** The correct answer index for each question */
  correctAnswers: number[]
  /** Which questions have been “checked”/locked in */
  checked: boolean[]
  /** Called when the user clicks question #i */
  onJump: (i: number) => void
}

const Sidebar: FC<SidebarProps> = ({ answers, correctAnswers, checked, onJump }) => {
  return (
    <aside className="w-20 space-y-1">
      {answers.map((_ans, i) => {
        let bg: string
        if (!checked[i]) {
          bg = 'bg-gray-200'
        } else if (answers[i] === correctAnswers[i]) {
          bg = 'bg-green-500'
        } else {
          bg = 'bg-red-500'
        }
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={`${bg} text-white rounded w-full h-8 flex items-center justify-center text-sm`}
          >
            {i + 1}
          </button>
        )
      })}
    </aside>
  )
}

export default Sidebar
