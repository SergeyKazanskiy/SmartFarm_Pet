'use client'

import type { ReactNode } from 'react'

export interface DisciplineItem {
  id: string
  name: string
  icon?: ReactNode
}

export interface IconsBarProps {
  items: DisciplineItem[]
  selectedId: string | null
  onClick: (id: string) => void
}

export function IconsBar({ items, selectedId, onClick }: IconsBarProps) {
  return (
    <div className="flex flex-col items-stretch gap-1 py-2">
      {items.map((it) => {
        const active = it.id === selectedId
        return (
          <button
            key={it.id}
            type="button"
            title={it.name}
            onClick={() => onClick(it.id)}
            className={`flex h-10 w-full items-center justify-center transition-colors ${
              active
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {it.icon ?? (
              <span className="text-xs font-semibold uppercase">
                {it.name.slice(0, 2)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}