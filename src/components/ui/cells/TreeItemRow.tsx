'use client'

import { ChevronRight, FileCode2, Folder, FolderOpen } from 'lucide-react'
import type { TreeItem } from '@/types/file-manager'

const statusClass = {
  empty: 'bg-gray-400',
  draft: 'bg-yellow-400',
  progress: 'bg-blue-400',
  ready: 'bg-green-500',
  error: 'bg-red-500',
}

type Props = {
  item: TreeItem
  level: number
  selectedId: string | null
  expandedIds: string[]
  isActive: boolean
  onFileSelect: (id: string) => void
  onFolderToggle: (id: string) => void
}

export function TreeItemRow({
  item, level, selectedId, expandedIds, isActive, onFileSelect, onFolderToggle,
}: Props) {
  const isFolder = item.type === 'folder'
  const expanded = isFolder && expandedIds.includes(item.id)
  const selected = !isFolder && selectedId === item.id

  return (
    <div>
      <button
        type="button"
        onClick={() => isFolder ? onFolderToggle(item.id) : onFileSelect(item.id)}
        onDoubleClick={() => {
          // При необходимости здесь можно добавить отдельное событие открытия редактора.
        }}
        aria-expanded={isFolder ? expanded : undefined}
        aria-current={selected ? 'true' : undefined}
        className={[
          'flex h-7 w-full min-w-0 items-center gap-1 pr-2 text-left text-sm',
          'select-none whitespace-nowrap hover:bg-[var(--muted)]',
          selected && isActive ? 'bg-blue-500/15 text-blue-600' : '',
        ].join(' ')}
        style={{ paddingLeft: `${level * 14 + 8}px` }}
      >
        {isFolder ? (
          <>
            <ChevronRight
              size={14}
              className={`shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
            />
            {expanded
              ? <FolderOpen size={16} className="shrink-0 text-amber-500" />
              : <Folder size={16} className="shrink-0 text-amber-500" />}
          </>
        ) : (
          <>
            <span className="w-[14px] shrink-0" />
            <FileCode2 size={16} className="shrink-0 text-sky-500" />
          </>
        )}

        <span className="min-w-0 flex-1 truncate">{item.title}</span>

        {item.status && (
          <span
            aria-label={`Статус: ${item.status}`}
            className={`ml-auto size-2 shrink-0 rounded-full ${statusClass[item.status]}`}
          />
        )}
      </button>

      {isFolder && expanded && item.children?.map((child) => (
        <TreeItemRow
          key={child.id}
          item={child}
          level={level + 1}
          selectedId={selectedId}
          expandedIds={expandedIds}
          isActive={isActive}
          onFileSelect={onFileSelect}
          onFolderToggle={onFolderToggle}
        />
      ))}
    </div>
  )
}
