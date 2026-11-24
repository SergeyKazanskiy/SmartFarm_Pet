'use client'

import type { ReactNode } from 'react'

export interface PropertyRow {
  label: string
  value: ReactNode
}

export interface PropertiesViewProps {
  label?: string;
  className?: string
  title?: string
  rows: PropertyRow[]
  emptyText?: string
}

export function PropertiesView({
  className = '',
  title = 'Свойства',
  rows,
  emptyText = 'Ничего не выбрано',
}: PropertiesViewProps) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden ${className}`}>
      <header className="flex h-8 shrink-0 items-center px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-3">
        {rows.length === 0 ? (
          <p className="text-sm text-gray-400">{emptyText}</p>
        ) : (
          <dl className="space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-2 text-sm">
                <dt className="text-gray-500">{r.label}</dt>
                <dd className="truncate text-right text-gray-800">{r.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}