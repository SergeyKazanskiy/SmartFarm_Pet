'use client'

export interface FlowTabItem {
  id: string
  name: string
}

export interface FlowTabsProps {
  items: FlowTabItem[]
  selectedId: string | null
  onClick: (id: string) => void
}

const ARROW_CLIP =
  'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)'

export function FlowTabs({ items, selectedId, onClick }: FlowTabsProps) {
  return (
    <div className="flex items-center">
      {items.map((it, i) => {
        const active = it.id === selectedId
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onClick(it.id)}
            style={{ clipPath: ARROW_CLIP }}
            className={`relative h-8 whitespace-nowrap pl-6 pr-4 text-xs font-medium transition-colors ${
              i > 0 ? '-ml-2' : ''
            } ${
              active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {it.name}
          </button>
        )
      })}
    </div>
  )
}