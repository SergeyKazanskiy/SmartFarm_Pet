'use client'

import type { TreeItem } from '@/types/file-manager'
import { TreeItemRow } from '@/components/ui/cells/TreeItemRow'


type Props = {
  label?: string;
  width?: number | string
  items: TreeItem[]
  selectedId: string | null
  expandedIds: string[]
  isActive: boolean
  onFileSelect: (id: string) => void
  onFolderToggle: (id: string) => void
}

export function FileNavigator({ width = 240, items, selectedId, expandedIds, isActive, onFileSelect, onFolderToggle }: Props) {
  return (
    <div
      className="h-full min-h-0 shrink-0 overflow-auto border-r border-[var(--border)] py-2"
      style={{ width }}
      role="tree"
      aria-label="Файлы проекта"
    >
      {items.length === 0 ? (
        <p className="px-3 py-2 text-xs text-[var(--muted-foreground)]">
          Нет файлов для выбранной дисциплины
        </p>
      ) : items.map((item) => (
        <TreeItemRow
          key={item.id}
          item={item}
          level={0}
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
