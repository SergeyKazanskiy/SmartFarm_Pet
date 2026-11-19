'use client'

import type { ReactNode } from 'react'

export interface ModeIconItem {
  id: string
  name: string
  icon?: ReactNode
}

export interface ModeIconsProps {
  items: ModeIconItem[]
  selectedId: string | null
  onClick: (id: string) => void
}

export function ModeIcons({ items, selectedId, onClick }: ModeIconsProps) {
  return (
    <div className="flex items-center gap-1">
      {items.map((it) => {
        const active = it.id === selectedId
        return (
          <button
            key={it.id}
            type="button"
            title={it.name}
            onClick={() => onClick(it.id)}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
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