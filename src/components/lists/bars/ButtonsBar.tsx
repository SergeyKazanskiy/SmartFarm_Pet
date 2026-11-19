'use client'

export interface CategoryItem {
  id: string
  name: string
}

export interface ButtonsBarProps {
  items: CategoryItem[]
  selectedId: string | null
  onClick: (id: string) => void
}

export function ButtonsBar({ items, selectedId, onClick }: ButtonsBarProps) {
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
            className={`flex h-24 w-full items-center justify-center border-l-2 text-xs transition-colors ${
              active
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
              {it.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}