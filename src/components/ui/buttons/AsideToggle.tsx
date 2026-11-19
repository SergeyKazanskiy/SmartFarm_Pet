'use client'

export interface AsideToggleProps {
  isOpen: boolean
  onToggle: () => void
  side?: 'left' | 'right'
}

export function AsideToggle({ isOpen, onToggle, side = 'left' }: AsideToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOpen}
      aria-label={isOpen ? 'Скрыть панель' : 'Показать панель'}
      title={isOpen ? 'Скрыть панель' : 'Показать панель'}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    >
      <svg
        className={`h-5 w-5 ${side === 'right' ? '-scale-x-100' : ''}`}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
        <line x1="7.5" y1="3.5" x2="7.5" y2="16.5" />
        {isOpen && (
          <rect
            x="2.5"
            y="3.5"
            width="5"
            height="13"
            rx="2"
            fill="currentColor"
            stroke="none"
            opacity="0.15"
          />
        )}
      </svg>
    </button>
  )
}