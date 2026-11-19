'use client'

import type { ReactNode } from 'react'

export interface ActionItem {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
}

export interface ActionsViewProps {
  className?: string
  title?: string
  items: ActionItem[]
  onAction: (id: string) => void
  emptyText?: string
}

export function ActionsView({
  className = '',
  title = 'Действия',
  items,
  onAction,
  emptyText = 'Нет доступных действий',
}: ActionsViewProps) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden ${className}`}>
      <header className="flex h-8 shrink-0 items-center px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        {items.length === 0 ? (
          <p className="p-1 text-sm text-gray-400">{emptyText}</p>
        ) : (
          <ul className="space-y-1">
            {items.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  disabled={a.disabled}
                  onClick={() => onAction(a.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {a.icon && <span className="shrink-0">{a.icon}</span>}
                  <span className="truncate">{a.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}