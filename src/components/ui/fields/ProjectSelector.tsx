'use client'

import { useEffect, useRef, useState } from 'react'

export interface ProjectItem {
  id: string
  name: string
}

export interface ProjectSelectorProps {
  width?: string
  items: ProjectItem[]
  selectedId: string | null
  onSelect: (id: string) => void
  placeholder?: string
}

export function ProjectSelector({
  width = '200px',
  items,
  selectedId,
  onSelect,
  placeholder = 'Выберите проект',
}: ProjectSelectorProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = items.find((it) => it.id === selectedId) ?? null

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  return (
    <div ref={rootRef} className="relative" style={{ width }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 hover:bg-gray-50"
      >
        <span className={`truncate ${selected ? '' : 'text-gray-400'}`}>
          {selected ? selected.name : placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {items.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-400">Нет проектов</li>
          )}
          {items.map((it) => {
            const active = it.id === selectedId
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(it.id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                    active ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="truncate">{it.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}